# 🎃 Leo's Spooky Studio

A delightful, interactive Halloween decoration web app designed for kids to explore their creativity on iPad. Drag and drop spooky emojis to decorate a haunted house, with day and night modes for extra fun!

![Screenshot 2024-10-28 at 10 40 22 AM](https://github.com/user-attachments/assets/63ae6b73-c9a2-4b55-b962-e2fef109878a)

## 🚀 Features

- Interactive drag-and-drop decoration placement
- Touch-optimized for iPad use
- Day/night mode toggle
- Collection of Halloween-themed emojis
- Simple, kid-friendly interface

## 🛠️ Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- Lucide Icons

## 🏃‍♂️ Running Locally

1. Clone the repository
```bash
git clone https://github.com/dharllc/leo-s-spooky-studio.git
cd leo-s-spooky-studio/frontend
```

2. Install dependencies
```bash
npm install
```

3. Start development server
```bash
npm run dev
```

4. Open in iPad browser
```
http://<your-computer-ip>:5173
```

## 📱 iPad Usage Tips

- Use Safari browser for best performance
- Keep iPad in landscape orientation
- Ensure iPad and development machine are on same network
- Disable iPad screen rotation lock

## 🎨 Customizing Decorations

To add or modify decorations, edit the `decorationItems` array in `src/types/index.ts`:

```typescript
export const decorationItems: DecorationItem[] = [
  { id: 'ghost', emoji: '👻', name: 'Ghost' },
  { id: 'pumpkin', emoji: '🎃', name: 'Pumpkin' },
  // Add more decorations here
];
```

## 🌙 Dark Mode

Toggle between day and night modes using the sun/moon button in the sidebar. Night mode includes:
- Darker background
- Twinkling stars
- Glowing windows
- Special decoration effects

## 📝 License

MIT License - Feel free to use and modify for your own spooky projects!

## 👻 Contributing

Contributions welcome! Please feel free to submit a Pull Request.
