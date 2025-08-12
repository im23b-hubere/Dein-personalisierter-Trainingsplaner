# 🏋️ Dein personalisierter Trainingsplaner

Eine moderne Web-Anwendung zur Erstellung personalisierter Trainingspläne basierend auf individuellen Zielen und Fitnesslevel.

## ✨ Features

- **Personalisierte Trainingspläne**: Erstelle maßgeschneiderte Workouts basierend auf deinen Zielen
- **Moderne Benutzeroberfläche**: Schönes, responsives Design mit Animationen
- **Detaillierte Übungspläne**: Konkrete Übungen mit Sätzen und Wiederholungen
- **Verschiedene Trainingsarten**: Ganzkörper, Split, PPL, HIIT, Arnold Split
- **Mobile-optimiert**: Funktioniert perfekt auf allen Geräten

## 🚀 Technologie-Stack

- **Next.js 14** - React Framework
- **TypeScript** - Typsicherheit
- **Tailwind CSS** - Modernes Styling
- **Framer Motion** - Smooth Animationen
- **Lucide React** - Icons

## 📦 Installation

1. **Dependencies installieren**:
```bash
npm install
```

2. **Entwicklungsserver starten**:
```bash
npm run dev
```

3. **Browser öffnen**: [http://localhost:3000](http://localhost:3000)

## 🚀 Deployment auf Vercel

### Option 1: Automatisches Deployment (Empfohlen)

1. **GitHub Repository erstellen** und Code pushen
2. **Vercel Account erstellen** auf [vercel.com](https://vercel.com)
3. **"New Project"** klicken und GitHub Repository auswählen
4. **Automatisches Deployment** - Vercel erkennt Next.js automatisch

### Option 2: Manuelles Deployment

1. **Vercel CLI installieren**:
```bash
npm i -g vercel
```

2. **Deploy**:
```bash
vercel
```

3. **Produktions-Build**:
```bash
npm run build
vercel --prod
```

## 📁 Projektstruktur

```
├── app/
│   ├── globals.css          # Globale Styles
│   ├── layout.tsx           # Root Layout
│   └── page.tsx             # Hauptseite
├── lib/
│   └── training-plans.ts    # Trainingsplan-Logik
├── public/                  # Statische Assets
├── package.json
├── tailwind.config.js
└── next.config.js
```

## 🎯 Trainingsplan-Typen

### Ganzkörpertraining
- **Für**: Anfänger
- **Fokus**: Gleichmäßige Entwicklung aller Muskelgruppen
- **Zeit**: 2-3 Tage pro Woche

### Split-Training
- **Für**: Fortgeschrittene
- **Fokus**: Ober-/Unterkörper getrennt
- **Zeit**: 3-4 Tage pro Woche

### Push/Pull/Legs (PPL)
- **Für**: Fortgeschrittene/Experte
- **Fokus**: Bewegungsmuster-basiertes Training
- **Zeit**: 3-6 Tage pro Woche

### HIIT-Training
- **Für**: Fettabbau
- **Fokus**: High-Intensity Interval Training
- **Zeit**: 3-5 Tage pro Woche

### Arnold Split
- **Für**: Experte
- **Fokus**: Maximale Intensität pro Muskelgruppe
- **Zeit**: 5-6 Tage pro Woche

## 🛠️ Entwicklung

### Scripts

```bash
npm run dev      # Entwicklungsserver
npm run build    # Produktions-Build
npm run start    # Produktions-Server
npm run lint     # Code-Linting
```

### Styling

Das Projekt verwendet **Tailwind CSS** mit custom Komponenten:

- `.btn-primary` - Primäre Buttons
- `.btn-secondary` - Sekundäre Buttons
- `.card` - Karten-Container
- `.option-card` - Auswahl-Optionen
- `.text-gradient` - Gradient-Text

## 📱 Responsive Design

Die Anwendung ist vollständig responsive und optimiert für:
- 📱 Mobile (320px+)
- 📱 Tablet (768px+)
- 💻 Desktop (1024px+)

## 🎨 Design-System

### Farben
- **Primary**: Blau-Gradient (#0ea5e9 → #0c4a6e)
- **Gray**: Neutrales Grau-Spektrum
- **Success**: Grün für Erfolgs-Indikatoren

### Animationen
- **Fade-in**: Sanfte Einblendungen
- **Slide-up**: Aufwärts-Bewegungen
- **Scale**: Hover-Effekte
- **Progress**: Fortschrittsbalken

## 🔧 Customization

### Neue Trainingspläne hinzufügen

1. **Plan-Logik** in `lib/training-plans.ts` erweitern
2. **Interface** entsprechend anpassen
3. **Erklärungen** in `getPlanExplanation()` hinzufügen

### Styling anpassen

1. **Tailwind Config** in `tailwind.config.js` erweitern
2. **Custom Components** in `globals.css` definieren
3. **Theme-Farben** nach Bedarf anpassen

## 📄 Lizenz

Entwickelt von **Eric Huber**

## 🤝 Beitragen

1. Fork erstellen
2. Feature Branch erstellen (`git checkout -b feature/AmazingFeature`)
3. Änderungen committen (`git commit -m 'Add some AmazingFeature'`)
4. Branch pushen (`git push origin feature/AmazingFeature`)
5. Pull Request erstellen

## 📞 Support

Bei Fragen oder Problemen:
- GitHub Issues erstellen
- Dokumentation durchsuchen
- Code-Beispiele in der README prüfen

---

**Viel Erfolg mit deinem personalisierten Trainingsplan! 💪**
