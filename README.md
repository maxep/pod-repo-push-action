# Pod Repo Push Action

Add your Podspec to your private repo on `tag` event.

## Inputs

### `repo-url`

**Required** Specify your podspec private repo source URL.

### `lint-args`

**Optional** spec lint args, default: `--allow-warnings`

## Example usage
```yml
- name: Run tests
      run: swift test --enable-code-coverage

- name: pod repo push
    uses: maxep/pod-repo-push-action@0.1.0
    with:
        repo-url: https://maxep:${{secrets.ACCESS_TOKEN}}@github.com/maxep/cocoapods-specs.git 
```

## Acknowledgements

The initial code is based on [wlixcc/pod-lib-update-action](https://github.com/wlixcc/pod-lib-update-action).