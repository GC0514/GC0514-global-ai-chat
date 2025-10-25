# API & Backend Blueprint: Global AI Country Chat

## 1. Overview

This document outlines the backend architecture, database models, RESTful API endpoints, and WebSocket events required to transform the frontend prototype into a persistent, real-time, multi-user application. 

The backend's primary responsibility is to execute the simulation logic defined in `src/services/simulationService.ts`. This file serves as the **authoritative source of truth** for the simulation's rules and should be translated 1:1 into the chosen backend language.

## 2. Database Models (Schema)

The following models are derived directly from `src/types/index.ts`. They represent the core entities to be stored in a relational (e.g., PostgreSQL) or document (e.g., MongoDB) database.

---

### **`Country`**
Stores the dynamic state and static profile of each nation.

| Field | Type | Description |
| :--- | :--- | :--- |
| `id` | `String` (PK) | 3-letter country code (e.g., "USA"). |
| `name` | `String` | Full country name. |
| `avatar` | `String` | Emoji flag. |
| `economicStability` | `Float` | 0-100 score. |
| `domesticSupport` | `Float` | 0-100 score. |
| `militaryAlertLevel`| `Float` | 0-100 score. |
| `observerTrust` | `Float` | 0-100 score. |
| `shortTermGoal` | `Text` | The AI's current short-term objective. |
| `longTermGoal` | `Text` | The AI's grand strategy. |
| `relationships` | `JSON` | Object mapping other country IDs to standing/alignment scores. |
| `...` | `...` | Other static profile fields from `data.ts`. |

---

### **`Pact`**
Stores diplomatic treaties between nations.

| Field | Type | Description |
| :--- | :--- | :--- |
| `id` | `String` (PK) | Unique identifier for the pact. |
| `type` | `String` | Enum: 'non_aggression', 'economic_cooperation', 'tech_sharing'. |
| `participants` | `Array<String>` | Array of two Country IDs. |
| `status` | `String` | Enum: 'proposed', 'negotiating', 'active', 'rejected', 'broken', 'expired'. |
| `proposer` | `String` (FK->Country) | Country ID of the proposer. |
| `expires` | `Integer` | Turn number when the pact expires. |
| `createdAt`| `DateTime` | Timestamp of creation. |

---

### **`Chat`**
Stores information about a communication channel.

| Field | Type | Description |
| :--- | :--- | :--- |
| `id` | `String` (PK) | Unique identifier for the chat. |
| `name` | `String` | Display name of the chat. |
| `type` | `String` | Enum: 'group', 'private', 'summit', 'pact'. |
| `participants` | `Array<String>` | Array of Country IDs and/or 'observer'. |

---

### **`Message`**
Stores individual messages within chats.

| Field | Type | Description |
| :--- | :--- | :--- |
| `id` | `Integer` (PK) | Auto-incrementing primary key. |
| `chatId` | `String` (FK->Chat) | The chat this message belongs to. |
| `senderId` | `String` | Country ID or a system ID (e.g., 'observer', 'system', 'news_flash'). |
| `text` | `Text` | The content of the message. |
| `title` | `String` | Optional title (for news flashes, etc.). |
| `isFabricated`| `Boolean` | Flag for fabricated news. |
| `timestamp` | `DateTime` | Timestamp of when the message was sent. |

---

### **`WorldEvent`**
Stores a historical log of major events for the "Chronicle".

| Field | Type | Description |
| :--- | :--- | :--- |
| `id` | `Integer` (PK) | Auto-incrementing primary key. |
| `turn` | `Integer` | The turn number on which the event occurred. |
| `type` | `String` | Enum describing the event type (e.g., 'pact_proposed', 'world_crisis'). |
| `description` | `Text` | A human-readable description of the event. |
| `relatedCountryIds` | `Array<String>` | Country IDs involved in the event. |
| `timestamp` | `DateTime` | Timestamp of the event. |

---

## 3. RESTful API Endpoints

The API allows the client to fetch state and submit actions. All actions should trigger the corresponding logic in `simulationService` on the backend.

### **State Synchronization**
- `GET /api/state`: Retrieves the complete initial state for the client upon loading, including all countries, active pacts, chats, recent messages, and world events.
- `GET /api/metrics`: Retrieves the latest `WorldStateMetrics` for the Command & Control dashboard.

### **Observer Actions**
- `POST /api/chats/{chatId}/messages`
  - **Action:** Sends a message as the Observer.
  - **Body:** `{ "text": "Your message content" }`
  - **Backend Logic:** Triggers `handleObserverMessage` and `processTurnEnd`. The resulting new AI messages and state changes should be broadcast via WebSockets.

- `POST /api/events/news`
  - **Action:** Publishes an official or fabricated news event.
  - **Body:** `{ "newsItemId": "news_1", "isFabricated": false, ... }`
  - **Backend Logic:** Triggers `postNewsEvent`.

- `POST /api/chats/summit`
  - **Action:** Hosts a new summit.
  - **Body:** `{ "theme": "Global Climate Action", "participantIds": ["USA", "CHN", "DEU"] }`
  - **Backend Logic:** Triggers `hostSummit`.

- `POST /api/events/intel`
  - **Action:** Leaks raw intelligence to the global chat.
  - **Body:** `{ "intel": "Secret information..." }`
  - **Backend Logic:** Triggers `leakIntel`.

- `POST /api/pacts`
  - **Action:** Proposes a pact between two nations.
  - **Body:** `{ "sourceId": "USA", "targetId": "CAN", "pactType": "economic_cooperation" }`
  - **Backend Logic:** Triggers `proposePact`.

- `POST /api/intel/{countryId}/operation`
  - **Action:** Executes an intelligence operation against a target country.
  - **Body:** `{ "operationType": "monitor" | "sabotage" | "unrest" }`
  - **Backend Logic:** Triggers `handleIntelOperation`.

- `POST /api/chats/private`
  - **Action:** Starts a new private chat with a country.
  - **Body:** `{ "countryId": "FRA" }`
  - **Backend Logic:** Triggers `startPrivateChat`.

---

## 4. Real-Time Communication (WebSockets)

The backend must push updates to all connected clients via a WebSocket connection to ensure a live, synchronized experience.

### **Server-to-Client Events**

- `new_message`
  - **Trigger:** An AI or system generates a new message.
  - **Payload:** The full `Message` object.

- `state_update`
  - **Trigger:** At the end of a turn or after an event, one or more countries' properties (e.g., economy, support) change.
  - **Payload:** A partial update object, e.g., `{ "countries": { "USA": { "economicStability": 75.2 }, "CHN": { "domesticSupport": 88.1 } } }`

- `pact_update`
  - **Trigger:** A pact's status changes (e.g., from 'negotiating' to 'active').
  - **Payload:** The full, updated `Pact` object.

- `new_world_event`
  - **Trigger:** A new entry is added to the "Chronicle".
  - **Payload:** The full `WorldEvent` object.

- `metrics_update`
  - **Trigger:** Global metrics change, typically at the end of a turn.
  - **Payload:** The full `WorldStateMetrics` object.

- `new_chat`
  - **Trigger:** A new chat (summit, secret channel) is created.
  - **Payload:** The full `Chat` object.
