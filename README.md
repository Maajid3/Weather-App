<div align="center">

# ⛅ Weather App

**Beautiful weather at your fingertips**

<!-- ⚡ Animated Storm Scene - Clouds, Lightning & Rain -->
<br/>
<img src="public/weather-animation.svg" width="100%" alt="Animated weather scene with clouds, lightning strikes, twinkling stars, and rain" />
<br/>

<!-- Typing Animation -->
<a href="#">
  <img src="https://readme-typing-svg.demolab.com/?font=Fira+Code&weight=600&size=22&pause=1000&color=62B6CB&center=true&vCenter=true&random=false&width=600&lines=%F0%9F%8C%A4%EF%B8%8F+Real-time+Weather+Data;%F0%9F%8C%99+Day+%26+Night+Adaptive+UI;%E2%9C%A8+Canvas-based+Weather+Animations;%F0%9F%94%8D+Smart+City+Search;%F0%9F%93%B1+Fully+Responsive+Design" alt="Typing SVG" />
</a>

<br/>

<!-- Badges Row 1 -->

![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7.3-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![MUI](https://img.shields.io/badge/MUI-Icons-007FFF?style=for-the-badge&logo=mui&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-Styled-1572B6?style=for-the-badge&logo=css3&logoColor=white)

<!-- Badges Row 2 -->

![TanStack Query](https://img.shields.io/badge/TanStack_Query-5.x-FF4154?style=for-the-badge&logo=reactquery&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-HTTP-5A29E4?style=for-the-badge&logo=axios&logoColor=white)
![Open Meteo](https://img.shields.io/badge/Open--Meteo-API-FF6F00?style=for-the-badge&logo=icloud&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

<br/>
<br/>

> **A sleek, animated React weather app with day/night adaptive UI, canvas-rendered weather effects, and real-time forecasts — powered by the Open-Meteo API.**

</div>

<br/>

<!-- Animated Divider -->
<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif" width="100%">

<br/>

## <img src="https://media.giphy.com/media/iY8CRBdQXODJSCERIr/giphy.gif" width="30"> &nbsp;Features

<table>
<tr>
<td width="50%">

### 🎨 Adaptive UI

- **Day / Night mode** — automatically switches based on local time
- Dynamic background images & color overlays
- All text, icons, and UI elements adapt to current mode

</td>
<td width="50%">

### ✨ Weather Animations

- **Sun rays** with breathing opacity (day)
- **Twinkling stars** with sine-wave flicker (night)
- **Animated clouds** drifting across the screen
- Smooth 60fps canvas rendering

</td>
</tr>
<tr>
<td width="50%">

### 🌡️ Comprehensive Data

- Current temperature & feels-like
- Wind speed, humidity, precipitation
- 24-hour hourly forecast with time-based icons

</td>
<td width="50%">

### 🔍 Smart Search

- Instant city search with geocoding
- Last searched city persisted in localStorage
- Graceful error & not-found states

</td>
</tr>
</table>

<br/>

## <img src="https://media2.giphy.com/media/QssGEmpkyEOhBCb7e1/giphy.gif?cid=ecf05e47a0n3gi1bfqntqmob8g9aid1oyj2wr3ds3mg700bl&rid=giphy.gif" width="30"> &nbsp;Tech Stack

<div align="center">

|                               Layer                                | Technology                                     |
| :----------------------------------------------------------------: | :--------------------------------------------- |
|   <img src="https://skillicons.dev/icons?i=react" width="28" />    | **React 19** — UI library with hooks & context |
|    <img src="https://skillicons.dev/icons?i=vite" width="28" />    | **Vite 7** — Lightning-fast build tool         |
| <img src="https://skillicons.dev/icons?i=materialui" width="28" /> | **MUI Icons** — Material Design icon set       |
|    <img src="https://skillicons.dev/icons?i=css" width="28" />     | **CSS3** — Custom styles & weather animations  |
|                                 🔄                                 | **TanStack Query** — Async state & caching     |
|                                 📡                                 | **Axios** — HTTP client                        |
|                                 🌐                                 | **Open-Meteo API** — Free weather & geocoding  |

</div>

<br/>

## <img src="https://media.giphy.com/media/WUlplcMpOCEmTGBtBW/giphy.gif" width="30"> &nbsp;Project Structure

```
weatherApp/
├── public/
├── src/
│   ├── api/
│   │   ├── apiClient.js          # Axios instance & API calls
│   │   └── customHook/
│   │       └── useData.js         # TanStack Query data hook
│   ├── assets/                    # Icons & background images
│   ├── components/
│   │   ├── SearchCity.jsx         # City search with autocomplete
│   │   ├── Temperature.jsx        # Current temp & date display
│   │   ├── FeelsLike.jsx          # Apparent temperature
│   │   ├── HourlyWeather.jsx      # 24h forecast timeline
│   │   ├── Humidity.jsx           # Humidity percentage
│   │   ├── Wind.jsx               # Wind speed display
│   │   ├── Precipitation.jsx      # Rain/snow amount
│   │   ├── WeatherBg.jsx          # Day/night backgrounds
│   │   └── WeatherEffects.jsx     # Canvas weather animations
│   ├── context/
│   │   └── WeatherDataContext.jsx # Global weather state
│   ├── fallbacks/
│   │   ├── Error.jsx              # Error boundary UI
│   │   ├── Loader.jsx             # Loading spinner
│   │   └── NotFound.jsx           # City not found
│   ├── styles/                    # CSS modules
│   ├── App.jsx                    # Root layout
│   └── main.jsx                   # Entry point
├── index.html
├── vite.config.js
└── package.json
```

<br/>

## <img src="https://media.giphy.com/media/j2pOGeGYKe2xCCKwfi/giphy.gif" width="30"> &nbsp;Getting Started

### Prerequisites

![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=flat-square&logo=nodedotjs&logoColor=white)
![npm](https://img.shields.io/badge/npm-9+-CB3837?style=flat-square&logo=npm&logoColor=white)

### Installation

```bash
# Clone the repository
git clone https://github.com/Maajid3/Weather-App.git

# Navigate to project directory
cd weatherApp

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts

| Command           | Description                    |
| :---------------- | :----------------------------- |
| `npm run dev`     | Start Vite dev server with HMR |
| `npm run build`   | Build for production           |
| `npm run preview` | Preview production build       |
| `npm run lint`    | Run ESLint checks              |

<br/>

## <img src="https://media.giphy.com/media/LnQjpWaON8nhr21vNW/giphy.gif" width="30"> &nbsp;How to Use

<div align="center">

```
  ┌────────────────────────────────────────────────┐
  │  1. 🔍  Type a city name in the search bar    │
  │  2. 📍  Select City                           │
  │  3. 🌤️  View real-time weather dashboard      │
  │  4. 📊  Scroll through 24h hourly forecast    │
  │  5. 🌙  Watch the UI adapt to day/night       │
  └────────────────────────────────────────────────┘
```

</div>

<br/>

## 🌐 API Reference

This app uses the **free** [Open-Meteo API](https://open-meteo.com/) — no API key required.

| Endpoint                         | Purpose                       |
| :------------------------------- | :---------------------------- |
| `geocoding-api.open-meteo.com`   | City name → coordinates       |
| `api.open-meteo.com/v1/forecast` | Current & hourly weather data |

**Data includes:** temperature, feels-like, humidity, wind speed, precipitation, and timezone-aware timestamps.

<br/>

## <img src="https://media.giphy.com/media/du3J3cXyzhj75IOgvA/giphy.gif" width="30"> &nbsp;Contributing

Contributions are what make the open-source community amazing! Any contributions you make are **greatly appreciated**.

1. **Fork** the project
2. **Create** your feature branch — `git checkout -b feature/AmazingFeature`
3. **Commit** your changes — `git commit -m 'Add AmazingFeature'`
4. **Push** to the branch — `git push origin feature/AmazingFeature`
5. **Open** a Pull Request

> 💡 Please open an issue first to discuss what you would like to change.

<br/>

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for more information.

<br/>

## <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/People%20with%20professions/Man%20Technologist%20Light%20Skin%20Tone.png" width="7%"> Author

<div align="center">

**Maajid Ali**

[![GitHub](https://img.shields.io/badge/GitHub-Follow-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/your-username)

</div>
