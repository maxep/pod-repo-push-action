const core = require('@actions/core')
const github = require('@actions/github')
const exec = require('@actions/exec')
const fs = require('fs')
const path = require('path')

async function main() {

    const spec_repo_url = core.getInput('repo-url')
    const args = core.getInput('args')
    const spec_repo_name = 'private_spec_repo'

    function findSpec() {
        const files = fs.readdirSync(process.env.GITHUB_WORKSPACE)
    
        for (var i in files) {
            if (path.extname(files[i]) === ".podspec") {
                return files[i]
            }
        }
    }

    const refs = 'refs/tags/';
    if (!github.context.ref.startsWith('refs/tags/')) {
        core.setOutput('Not a tag event')
        return
    }

    const tag = github.context.ref.substring(refs.length);

    const podspec = findSpec()

    if (!podspec) {
        core.setFailed('No podspec file found.')
        return
    }

    await exec.exec('gem install cocoapods')
    await exec.exec('gem install fastlane')

    // add spec repo
    await exec.exec(`pod repo add ${spec_repo_name} ${spec_repo_url}`)

    // change version in spec file
    await exec.exec(`fastlane run version_bump_podspec path:${podspec} version_number:${tag}`)

    // pod repo push
    await exec.exec(`pod repo push ${spec_repo_name} ${podspec} ${args}`)
}


main().catch(err => core.setFailed(err.message))