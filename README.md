# Pod Repo Push Action

Add podspec to your private repo on `tag` event. The action will automatically update the podspec version based on the tag name using the [version_bump_podspec](https://docs.fastlane.tools/actions/version_bump_podspec/) action from Fastlane.

## Inputs

### `repo-url`

**Required** Specify your podspec private repo source URL.

### `lint-args`

**Optional** spec lint args, default: `--allow-warnings`

## Example usage

Like in the following example, you can set the `username` and `password` URL values to your __Github Username__ and __Personal Access Token__ to be able to push to another repo.

You can also use another action to setup ssh on the build machine, like [webfactory/ssh-agent](https://github.com/webfactory/ssh-agent).

```yml
- name: Run tests
      run: swift test --enable-code-coverage

- name: pod repo push
    uses: maxep/pod-repo-push-action@0.1.0
    with:
        repo-url: https://maxep:${{ secrets.ACCESS_TOKEN }}@github.com/maxep/cocoapods-specs.git 
```

## Acknowledgements

The initial code is based on [wlixcc/pod-lib-update-action](https://github.com/wlixcc/pod-lib-update-action).
