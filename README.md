<img alt="Auuki Indoor Cycling app for Structured Training" src="https://github.com/user-attachments/assets/292a3216-2f52-4994-9b15-614446e41912" />

# Auuki

Auuki is a desktop-browser indoor cycling app for running structured workouts on a computer connected to a smart trainer. It is designed for a single-user, local-first setup: workouts, settings, and recorded activity data stay in your browser unless you explicitly export or connect a third-party service.

## What this app focuses on

- Computer-based indoor training in Chrome, Edge, Opera, Brave, or another desktop browser with the required device APIs.
- Smart trainer control over Bluetooth FTMS, Tacx FE-C over BLE, Wahoo CPS, and supported ANT+ setups.
- Running Zwift `.zwo` workouts and built-in structured workouts.
- Editing workouts locally before training.
- Adjusting a structured workout while riding without stopping the session.
- Recording `.FIT` activity files for export or upload.

This repo targets desktop-browser workflows only.

## Current features

### Workout execution

- Run structured `.zwo` workouts in ERG mode, grade simulation, resistance mode, or slope-targeted workout mode.
- Move to the next or previous workout step while training.
- Finish the current step immediately.
- Extend or shorten the active step by 30 seconds.
- Pause workout progression separately from the ride/session controls.
- Scale workout intensity during a ride.
- Click workout graph blocks to jump directly to a specific interval/step.
- Use keyboard shortcuts for common workout controls.

### Workout editing

- Create and edit workout rows in the browser.
- Duplicate selected rows.
- Split selected intervals.
- Move selected rows up or down.
- Bulk-adjust selected row power targets.
- Bulk-adjust selected row durations.
- Save edited workouts locally and download workout files.

### Recording and export

- Record `.FIT` activities.
- Include common cycling metrics such as power, cadence, speed, heart rate, and RR intervals where supported by connected devices.
- Save activity data locally in the browser.
- Export files manually, or use optional Strava / Intervals.icu connections where configured.

### Local-first single-user workflow

- No account login or profile screen is required.
- Core training and editing workflows run locally in the browser.
- Third-party connections are optional and only needed for external syncing/uploading.

## Supported desktop browsers

Use a current desktop Chromium-based browser for the best hardware support:

| Platform | Recommended browsers | Notes |
| --- | --- | --- |
| Windows | Chrome, Edge, Brave, Opera | Best for Bluetooth trainer/device connections. |
| macOS | Chrome, Edge, Brave, Opera | Best for Bluetooth trainer/device connections. |
| Linux | Chrome, Edge, Brave, Opera | May require enabling experimental web platform features for some device APIs. |

Firefox and Safari are not recommended because required Bluetooth/serial APIs are missing or incomplete for this app.

For Brave, enable Web Bluetooth if needed: `brave://flags/#enable-experimental-web-platform-features`.

For Linux, enable experimental web platform features if your browser does not expose the required APIs:

- Chrome: `chrome://flags/#enable-experimental-web-platform-features`
- Edge: `edge://flags/#enable-experimental-web-platform-features`
- Opera: `opera://flags/#enable-experimental-web-platform-features`

## Supported trainer/device paths

### Bluetooth

Bluetooth is the primary connection path. Auuki supports trainers and sensors that expose common cycling services, including:

- FTMS smart trainers
- Tacx FE-C over BLE trainers
- Wahoo CPS trainers
- Bluetooth power meters
- Bluetooth cadence/speed sensors
- Bluetooth heart-rate monitors
- Moxy and compatible muscle oxygen sensors where supported

### ANT+

ANT+ support is experimental and depends on browser serial support and compatible USB ANT hardware. Treat ANT+ as an advanced desktop setup, not the default path.

## Launch locally

### Requirements

- Node.js and npm
- A supported desktop browser
- A Bluetooth-capable computer for trainer/sensor connections

### Install dependencies

```bash
npm install
```

### Start the development server

```bash
npm start
```

Open the Parcel URL printed in the terminal. It is usually:

```text
http://localhost:1234
```

### Start with local TLS

Some device APIs may require a secure context. If you have development certificates in `dev_cert/cert.pem` and `dev_cert/key.pem`, start the TLS dev server with:

```bash
npm run starttls
```

### Build production assets

```bash
npm run build
```

### Run tests

```bash
npm test -- --runInBand
```

## Basic use

1. Open the app on a supported desktop browser.
2. Pair your trainer and sensors from the connection/settings controls.
3. Pick a built-in workout or import/edit a `.zwo` workout.
4. Start the workout.
5. Use on-screen controls or keyboard shortcuts to adjust the workout while riding.
6. Save or export the recorded `.FIT` activity when finished.

## Keyboard controls

Common workout shortcuts include:

| Shortcut | Action |
| --- | --- |
| Space | Start or pause the session. |
| `l` | Lap / advance interval behavior. |
| Right arrow | Next workout step. |
| Left arrow | Previous workout step. |
| `]` | Extend the active step. |
| `[` | Shorten the active step. |
| `+` / `=` | Increase workout intensity. |
| `-` | Decrease workout intensity. |
| Up / Down arrows | Adjust the active mode target where supported. |

Shortcuts are ignored while typing in editor inputs.

## Project scripts

| Command | Purpose |
| --- | --- |
| `npm install` | Install dependencies. |
| `npm start` | Run the local Parcel development server. |
| `npm run starttls` | Run the local Parcel development server with TLS certificates. |
| `npm run build` | Build production assets. |
| `npm test -- --runInBand` | Run the Jest test suite serially. |

## Data and privacy

Auuki is local-first. Workout editing, app settings, and recorded activities are stored in your browser storage unless you export files or connect a third-party service. Clearing browser data can remove local workouts and activity history, so export anything important.

## Backers

<div>
    <a href="https://github.com/KlausMu" target="_blank">
        <img style="display: inline-block;" src="https://avatars.githubusercontent.com/u/14290221?v=4" width="48" height="48" />
    </a>
    <a href="https://github.com/TClin76" target="_blank">
        <img style="display: inline-block;" src="https://avatars.githubusercontent.com/u/96434118?v=4" width="48" height="48" />
    </a>
    <a href="https://github.com/fvolcic" target="_blank">
        <img style="display: inline-block;" src="https://avatars.githubusercontent.com/u/59806465?s=64&v=4" width="48" height="48" />
    </a>
    <a href="https://github.com/napfbike" target="_blank">
        <img style="display: inline-block;" src="https://avatars.githubusercontent.com/u/192727271?v=4" width="48" height="48" />
    </a>
    <a href="https://github.com/sharalds" target="_blank">
        <img style="display: inline-block;" src="https://avatars.githubusercontent.com/u/25537910?v=4" width="48" height="48" />
    </a>
    <a href="https://github.com/BenSimpsonAnalytics" target="_blank">
        <img style="display: inline-block;" src="https://avatars.githubusercontent.com/u/81325092?v=4" width="48" height="48" />
    </a>
</div>
