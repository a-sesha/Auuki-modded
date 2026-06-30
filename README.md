<img alt="Auuki Indoor Cycling app for Structured Training" src="https://github.com/user-attachments/assets/292a3216-2f52-4994-9b15-614446e41912" />

# Auuki

**Key Features**:
* Run Zwift **.ZWO workouts** and built-in structured workouts
* Dynamically control workouts while training: next/previous step, finish the current step, extend or shorten intervals, and pause workout progression independently
* Scale workout intensity during a ride and use keyboard shortcuts for quick workout control
* Scrub workouts from the workout graph by selecting specific intervals/steps
* Edit workouts locally with duplicate, split, move, bulk power, and bulk duration tools
* Connect via **Bluetooth** to smart trainers, power meters, heart rate monitors, the moxy monitor, and many more
* Full control with **ERG mode**, **Grade Simulation**, and **Resistance mode**
* Workouts with **Slope-based targets** for realistic effort control
* Record **.FIT activities** in a cross-industry standard, including native **RR intervals**
* Optional **Intervals.icu and Strava** integrations for workout syncing and activity uploads
* Single-user, local-first workflow with no account login required

## What this app focuses on

- Computer-based indoor training in Chrome, Edge, Opera, Brave, or another desktop browser with the required device APIs.
- Smart trainer control over Bluetooth FTMS, Tacx FE-C over BLE, Wahoo CPS, and supported ANT+ setups.
- Running Zwift `.zwo` workouts and built-in structured workouts.
- Editing workouts locally before training.
- Adjusting a structured workout while riding without stopping the session.
- Recording `.FIT` activity files for export or upload.

# The Web App
- You can find the web app at [auuki.com](https://auuki.com)
- There is also a special development version which has the latest features available for preview: [dev.auuki.com](https://dev.auuki.com)

## Launch locally
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the local development server:
   ```bash
   npm start
   ```
3. Open the local Parcel URL shown in the terminal, usually `http://localhost:1234`.

For browser APIs that require a secure context, use the TLS dev server after adding the expected development certificates under `dev_cert/`:
```bash
npm run starttls
```

Useful project checks:
```bash
npm run build
npm test -- --runInBand
```

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

## Manual
- [How-To: Using the connection settings](https://github.com/dvmarinoff/Auuki/discussions/91)
- [How-To: Using Auuki and another app concurrently](https://github.com/dvmarinoff/Auuki/discussions/101)

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
