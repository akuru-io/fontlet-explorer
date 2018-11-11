# Contributing to Fontlet project

Fontlet is a free software project hosted on Github, and runs the [typical](http://producingoss.com) free software way.
We'd love to accept your patches and contributions to the project. If you wish to contribute, please read this first.

This project welcomes non-code contributions, too! The following types of contributions are welcome:

- **Ideas**: participate in an issue thread or start your own to have your voice heard.
- **Writing**: contribute your expertise in an area by helping expand the included documentation.
- **Copy editing**: fix typos, clarify language, and improve the quality of the documentation.
- **Formatting**: help keep docs easy to read with consistent formatting.
- **Trranslating**: help translating the app UI, documentation or website.

### Reporting bugs

Create an issue with clear description, steps to reproduce, screenshots and other necessary information that might help developers to reproduce the problem and fix it.

Apply relevant labels as `bug`, and the platform: `platform:win`, `platform:darwin`, `platform:linux`, `platform:all`.

### Translations

We do not have internationalization in place yet.

### Documentation

Update documentation and send PRs. :)

### Writing code

Are interested in writing code for this project? Awesome!

We use following technologies and tools,

- [NodeJS](https://nodejs.org/en/)
- Electron with React.js (CRA)
- styled-components
- [Blueprint](https://blueprintjs.com/docs/)
- [ESLint](https://eslint.org/)/[Prettier](https://prettier.io/)

We use the Github issue tracker for discussion and a few chatrooms in .

#### Code Style
<TODO>

#### Git branching

<TODO>

##### Branch names

Name the branches following the `<type>/<name>`

```
bug    - Code changes linked to a known issue.
feat   - New feature.
hotfix - Quick fixes to the codebase.
```

ie;
```
feat/renderer-cookies
hotfix/dockerfile-base-image
bug/login-ie
```

#### Rules

There are a few basic ground-rules for contributors:

1. **No `--force` pushes to master** or modifying history in any way. Rebasing and force pushing your own PR branch is fine.
2. **Non-master branches** should be used for ongoing work.
3. **Significant modifications** like API changes should be subject to a **pull request** to solicit feedback from other contributors.
4. **Pull requests** are *encouraged* for all contributions to solicit feedback, but left to the discretion of the contributor.

### Developing features and fixing bugs

Please search issues and pull requests before adding something new to avoid duplicating efforts and conversations. Please create an issue (if not one already created) when you start working on a feature/bug. Also, put a comment that mentioning you are working on that to avoid duplicate efforts.

Please don't create any new labels. If you think it is nice to have or must have a new label, please create a new issue or put it in the comments on a relevant thread. That'll help us to keep clean and efficient workflow.


## External Resources

- [Producing Open Source Software](https://producingoss.com/) by Karl Fogel
- [How to Write a Git Commit Message](https://chris.beams.io/posts/git-commit/) by Chris Beams
