🏠 HomeOS-AI

Your AI-powered family assistant for everyday life.

HomeOS-AI is a modern smart home dashboard designed to help organize everyday household tasks in one simple interface.

It combines smart reminders, shopping lists, and AI-powered recipe suggestions into a single home management hub.

✨ Features
⏰ Smart Reminders

Create reminders using natural language, for example:

"Remind me to water the plants at 6 PM"

HomeOS-AI automatically extracts the reminder, time, and date and keeps your tasks organized.

Create reminders
Natural-language time parsing
Mark reminders as completed
Delete reminders
Automatically sort reminders by date and time
Persist reminders using browser localStorage
🛒 Smart Shopping List

Keep track of everything you need to buy.

Add shopping items
Mark items as purchased
Remove items
Separate pending and purchased items
Smart suggestions for common household items
Persistent storage using localStorage

The app includes suggestions for common items such as milk, bread, eggs, rice, pasta, vegetables, and more.

🤖 AI Recipe Generator

Turn the ingredients you already have into meal ideas.

Enter ingredients such as:

rice, chicken, onion, garlic


The AI generates three recipe suggestions containing:

Recipe name
Required ingredients
Step-by-step instructions
Estimated cooking time
Cuisine type

The recipe generation API uses Google Gemini and automatically discovers available text-generation models, with configurable primary and fallback models.

🖥️ Interface

The application provides a clean dashboard containing:

                    🏠 HomeOS-AI
              Your AI-powered family assistant

        ┌─────────────────────┬──────────────────┐
        │                     │                  │
        │  ⏰ Smart Reminders  │ 🛒 Shopping List │
        │                     │                  │
        └─────────────────────┴──────────────────┘

        ┌────────────────────────────────────────┐
        │        🤖 AI Recipe Generator          │
        │                                        │
        │  Ingredients → AI → Recipe Suggestions │
        └────────────────────────────────────────┘


The UI uses animated gradients, responsive layouts, cards, icons, and a modern dashboard-style design. {"fallbackMarkdown":"(GitHub
)","reference":{"matched_text":"","prefix":null,"start_idx":2829,"end_idx":2857,"safe_urls":["https://raw.githubusercontent.com/shubhshot17/HomeOS-AI/main/app/page.tsx","https://raw.githubusercontent.com/shubhshot17/HomeOS-AI/main/components/home-header.tsx"],"refs":[],"alt":"(GitHub
)","prompt_text":null,"type":"grouped_webpages","style":null,"error":null,"fallback_items":null,"status":"done","items":[{"title":"","url":"https://raw.githubusercontent.com/shubhshot17/HomeOS-AI/main/components/home-header.tsx","attribution":"GitHub","pub_date":null,"snippet":null,"attribution_segments":null,"supporting_websites":[{"title":"","url":"https://raw.githubusercontent.com/shubhshot17/HomeOS-AI/main/app/page.tsx","pub_date":null,"snippet":null,"attribution":"GitHub"}],"refs":[{"turn_index":3,"ref_type":"view","ref_index":1},{"turn_index":2,"ref_type":"view","ref_index":0}],"hue":null,"attributions":null}]},"showLoginRequiredCard":false}

🛠️ Tech Stack
Next.js 16
React 19
TypeScript
Tailwind CSS
Google Gemini API
Lucide React
Radix UI
Recharts
React Hook Form
Zod
Vercel Analytics

The project configuration currently uses Next.js 16, React 19, the Gemini integration, Tailwind CSS, and several Radix UI components. {"fallbackMarkdown":"(GitHub
)","reference":{"matched_text":"","prefix":null,"start_idx":3208,"end_idx":3225,"safe_urls":["https://raw.githubusercontent.com/shubhshot17/HomeOS-AI/main/package.json"],"refs":[],"alt":"(GitHub
)","prompt_text":null,"type":"grouped_webpages","style":null,"error":null,"fallback_items":null,"status":"done","items":[{"title":"","url":"https://raw.githubusercontent.com/shubhshot17/HomeOS-AI/main/package.json","attribution":"GitHub","pub_date":null,"snippet":null,"attribution_segments":null,"supporting_websites":[],"refs":[{"turn_index":1,"ref_type":"view","ref_index":0}],"hue":null,"attributions":null}]},"showLoginRequiredCard":false}

📁 Project Structure
HomeOS-AI/
├── app/
│   ├── api/
│   │   └── recipes/
│   │       └── route.ts
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── ui/
│   ├── home-header.tsx
│   ├── recipe-suggester-section.tsx
│   ├── reminders-section.tsx
│   ├── shopping-list-section.tsx
│   └── theme-provider.tsx
│
├── hooks/
├── lib/
├── public/
├── styles/
│
├── next.config.mjs
├── package.json
├── tsconfig.json
└── README.md


The main dashboard is composed of the header, reminders, shopping list, and recipe generator sections. {"fallbackMarkdown":"(GitHub
)","reference":{"matched_text":"","prefix":null,"start_idx":3801,"end_idx":3840,"safe_urls":["https://github.com/shubhshot17/HomeOS-AI/tree/main/app","https://github.com/shubhshot17/HomeOS-AI/tree/main/components","https://raw.githubusercontent.com/shubhshot17/HomeOS-AI/main/app/page.tsx"],"refs":[],"alt":"(GitHub
)","prompt_text":null,"type":"grouped_webpages","style":null,"error":null,"fallback_items":null,"status":"done","items":[{"title":"","url":"https://raw.githubusercontent.com/shubhshot17/HomeOS-AI/main/app/page.tsx","attribution":"GitHub","pub_date":null,"snippet":null,"attribution_segments":null,"supporting_websites":[{"title":"HomeOS-AI/app at main · shubhshot17/HomeOS-AI · GitHub","url":"https://github.com/shubhshot17/HomeOS-AI/tree/main/app","pub_date":null,"snippet":null,"thumbnail_url":"https://images.openai.com/static-rsc-1/3UBPuzCGZ7THZ-Pg-MjuPGozoH3ndoc-i4-siJhOaTBcMWwdNJcMRVRnHqOio-GyVb_wp2MHua7njzh2IwNycu8Nu5_IBSjzCVZ1nsAWO0Ug8S_bIaFBSmEjjv1T1P7xBg2qN4UgfeHw5oU3o21bZ88guBhwwq0eWG7oOYU6AP95ksKWgfwP2bSvVXi-QbwD","attribution":"GitHub"},{"title":"HomeOS-AI/components at main · shubhshot17/HomeOS-AI · GitHub","url":"https://github.com/shubhshot17/HomeOS-AI/tree/main/components","pub_date":null,"snippet":null,"thumbnail_url":"https://images.openai.com/static-rsc-1/ed_2QpV90nqN8rxpVspj_AFUIZsDbr6UE7B_wSiOIZXgW-gEMdeiuDR33qXQd-3Dr3Q88hcSDxIYVOkYZX8Rzc42nhkXuPJQxn6cnIONzQg0A0HiYNUWtdYQrx3Gj_zNscXrVYII6kR85YuoYGn6uiM0MqzRI6B9pDCOMCWwyYXvGyF_PpG8fUK9opF5mFog","attribution":"GitHub"}],"refs":[{"turn_index":2,"ref_type":"view","ref_index":0},{"turn_index":1,"ref_type":"view","ref_index":1},{"turn_index":1,"ref_type":"view","ref_index":2}],"hue":null,"attributions":null}]},"showLoginRequiredCard":false}

🚀 Getting Started
1. Clone the repository
git clone https://github.com/shubhshot17/HomeOS-AI.git
cd HomeOS-AI

2. Install dependencies

Using npm:

npm install


Or using pnpm:

pnpm install

3. Configure environment variables

Create a .env.local file:

GEMINI_API_KEY=your_gemini_api_key


Optional model configuration:

GEMINI_MODEL=your_primary_model
GEMINI_FALLBACK_MODEL=your_fallback_model


Never commit your API key to GitHub.

4. Start the development server
npm run dev


Open:

http://localhost:3000

🧠 How AI Recipe Generation Works

The frontend sends the user's ingredients to:

POST /api/recipes


The API then:

Validates the ingredients.
Reads the Gemini API key.
Retrieves available Gemini models.
Selects a suitable text-generation model.
Sends a structured cooking prompt to Gemini.
Extracts the generated JSON.
Returns the recipes to the frontend.

The API is implemented in app/api/recipes/route.ts. {"fallbackMarkdown":"(GitHub
)","reference":{"matched_text":"","prefix":null,"start_idx":4908,"end_idx":4925,"safe_urls":["https://raw.githubusercontent.com/shubhshot17/HomeOS-AI/main/app/api/recipes/route.ts"],"refs":[],"alt":"(GitHub
)","prompt_text":null,"type":"grouped_webpages","style":null,"error":null,"fallback_items":null,"status":"done","items":[{"title":"","url":"https://raw.githubusercontent.com/shubhshot17/HomeOS-AI/main/app/api/recipes/route.ts","attribution":"GitHub","pub_date":null,"snippet":null,"attribution_segments":null,"supporting_websites":[],"refs":[{"turn_index":3,"ref_type":"view","ref_index":0}],"hue":null,"attributions":null}]},"showLoginRequiredCard":false}

💾 Data Storage

Currently, reminders and shopping-list data are stored locally in the browser using:

localStorage


This means the data is stored on the user's device/browser rather than in a remote database. {"fallbackMarkdown":"(GitHub
)","reference":{"matched_text":"","prefix":null,"start_idx":5157,"end_idx":5185,"safe_urls":["https://raw.githubusercontent.com/shubhshot17/HomeOS-AI/main/components/reminders-section.tsx","https://raw.githubusercontent.com/shubhshot17/HomeOS-AI/main/components/shopping-list-section.tsx"],"refs":[],"alt":"(GitHub
)","prompt_text":null,"type":"grouped_webpages","style":null,"error":null,"fallback_items":null,"status":"done","items":[{"title":"","url":"https://raw.githubusercontent.com/shubhshot17/HomeOS-AI/main/components/reminders-section.tsx","attribution":"GitHub","pub_date":null,"snippet":null,"attribution_segments":null,"supporting_websites":[{"title":"","url":"https://raw.githubusercontent.com/shubhshot17/HomeOS-AI/main/components/shopping-list-section.tsx","pub_date":null,"snippet":null,"attribution":"GitHub"}],"refs":[{"turn_index":2,"ref_type":"view","ref_index":2},{"turn_index":2,"ref_type":"view","ref_index":3}],"hue":null,"attributions":null}]},"showLoginRequiredCard":false}

📜 Available Scripts
npm run dev


Start the development server.

npm run build


Create a production build.

npm run start


Start the production server.

npm run lint


Run ESLint.

These scripts are defined in the project's package.json. {"fallbackMarkdown":"(GitHub
)","reference":{"matched_text":"","prefix":null,"start_idx":5477,"end_idx":5494,"safe_urls":["https://raw.githubusercontent.com/shubhshot17/HomeOS-AI/main/package.json"],"refs":[],"alt":"(GitHub
)","prompt_text":null,"type":"grouped_webpages","style":null,"error":null,"fallback_items":null,"status":"done","items":[{"title":"","url":"https://raw.githubusercontent.com/shubhshot17/HomeOS-AI/main/package.json","attribution":"GitHub","pub_date":null,"snippet":null,"attribution_segments":null,"supporting_websites":[],"refs":[{"turn_index":1,"ref_type":"view","ref_index":0}],"hue":null,"attributions":null}]},"showLoginRequiredCard":false}

🔐 Environment Variables
Variable	Required	Description
GEMINI_API_KEY	Yes*	Google Gemini API key
GEMINI_MODEL	No	Preferred Gemini model
GEMINI_FALLBACK_MODEL	No	Fallback Gemini model

* Required for the AI recipe generation feature unless an API key is supplied through the request.

🔮 Future Improvements

Some possible directions for HomeOS-AI:

🎙️ Voice-controlled home assistant
🏠 Smart-device integration
👨‍👩‍👧 Family accounts
☁️ Cloud synchronization
📱 Mobile/PWA support
🔔 Browser and mobile notifications
📅 Calendar integration
🧾 Automatic shopping-list generation from recipes
🍽️ Personalized meal recommendations
🧠 AI-powered household planning
🌦️ Weather-aware reminders
🔐 User authentication and encrypted cloud storage
🤝 Contributing

Fork the repository.
Create a feature branch.
git checkout -b feature/my-new-feature

Make your changes.
Commit your changes.
git commit -m "Add my new feature"

Push the branch.
git push origin feature/my-new-feature

Open a Pull Request.
📄 License

Add your preferred open-source license here, such as MIT License, before publishing the project as an open-source project.

🌟 Project

HomeOS-AI — bringing AI into the everyday home.

Built with ❤️ using Next.js, React, TypeScript, Tailwind CSS, and Google Gemini.