# GitHub Resume Generator

This project is a web application that generates a professional resume from a GitHub profile. Simply enter a GitHub username, and the application will create a resume based on the user's contributions and projects.

## Features

- Fetches user data from GitHub's API
- Generates a professional resume based on GitHub contributions and projects

## Mentions

The contribution graph in the user profile is generated using [ghchart](https://ghchart.rshah.org/) by [Rushi Shah](https://github.com/2016rshah). This service creates an image of a user's GitHub contribution graph which can be embedded in a webpage.

## Setup and Installation

1. Fork the repository & clone it to your local machine. Create a new branch using `git checkout -b <branch_name>` and proceed.
2. Install the dependencies using `npm install` or `yarn install`.
3. Start the development server using `npm run dev` or `yarn dev`.
4. For authentication, we have used Github OAuth using Supabase. To set this up:
   - Go to your [Supabase Dashboard](https://supabase.io/dashboard).
   - Select your project / Create a new one.
   - Navigate to the "Authentication" section, then to the "Settings" tab.
   - Under "OAuth Providers", find GitHub and fill in the "Client ID" and "Secret" fields with the details from your GitHub OAuth App. If you haven't created a GitHub OAuth App yet, you can follow [this guide](https://docs.github.com/en/developers/apps/building-oauth-apps/creating-an-oauth-app).
   - Save your changes.
   - Now you can do the authentication using github
5. Copy the `.env.example` to `.env.local` and put the secrets.
6. You are gtg.

## Tech used

- NextJS 14
- Shadcn/ui
- Tailwind CSS
- Github public API
- Supabase
- Github OAuth

## Screenshot

![image](https://github.com/ashutosh-rath02/git-re/assets/85403534/13ae316c-2254-4da3-b07f-8b55924a9b98)

## Upcoming features🎉

- [x] Add Supabase authentication
- [ ] Comparison between users
- [ ] Resume templates

## Contributing

Contributions are welcome! Please open an issue or submit a pull request if you would like to help improve the project.
NOTE 1: Please abide by the [Contributing Guidelines](https://github.com/ashutosh-rath02/git-re/blob/master/CONTRIBUTING.md).

NOTE 2: Please abide by the [Code of Conduct](https://github.com/ashutosh-rath02/git-re/blob/master/CODE_OF_CONDUCT.md).

NOTE 3: We follow the following [coventional commit types](https://github.com/pvdlg/conventional-commit-types)

## License

This project is licensed under the Apache 2.0 License & all rights reserved to author [ashutosh-rath02](https://github.com/ashutosh-rath02)

## Contributors

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://ashutoshrath.vercel.app/"><img src="https://avatars.githubusercontent.com/u/85403534?v=4?s=100" width="100px;" alt="Ashutosh Rath"/><br /><sub><b>Ashutosh Rath</b></sub></a><br /><a href="#code-ashutosh-rath02" title="Code">💻</a> <a href="#data-ashutosh-rath02" title="Data">🔣</a> <a href="#content-ashutosh-rath02" title="Content">🖋</a> <a href="#doc-ashutosh-rath02" title="Documentation">📖</a> <a href="#design-ashutosh-rath02" title="Design">🎨</a> <a href="#mentoring-ashutosh-rath02" title="Mentoring">🧑‍🏫</a> <a href="#projectManagement-ashutosh-rath02" title="Project Management">📆</a> <a href="#tutorial-ashutosh-rath02" title="Tutorials">✅</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://www.linkedin.com/in/nilanchal-panda/"><img src="https://avatars.githubusercontent.com/u/110488337?v=4?s=100" width="100px;" alt="NILANCHAL PANDA"/><br /><sub><b>NILANCHAL PANDA</b></sub></a><br /><a href="#code-NilanchalaPanda" title="Code">💻</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->
