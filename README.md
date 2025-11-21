# Movie Recommender

Prototype of a mobile application for movie recommendations based on Content-Based Filtering.
The application consists of a Python backend (FastAPI) and a mobile frontend in React Native (Expo).

## Prerequisites

Before running the project, ensure you have the following installed:

* **Mobile emulator tool**
* **Node.js** (LTS version) 
* **Python** (3.8 or newer) 
* **Expo Go** 
* **Git** 

---

## Step 1: Backend Setup

The API server is responsible for calculating recommendations.

1.  **Open a terminal** and navigate to the folder containing the `main.py` file.

2.  **Install required Python libraries:**
    You can do this manually or via a requirements file (if it exists).

    ```bash
    pip install fastapi uvicorn pandas scikit-learn numpy pydantic
    ```

    *Ensure you also have the `movies_data.pkl` and `tfidf_matrix.pkl` files in the same directory.*

3.  **Run the server:**
    It is crucial to use the `--host 0.0.0.0` flag so the server is visible on the local network (for the phone).

    ```bash
    uvicorn main:app --reload --host 0.0.0.0 --port 8000
    ```

4.  **Verify operation:**
    Open a browser on your computer and go to: [http://127.0.0.1:8000](http://127.0.0.1:8000). You should see the message: `{"message":"Server is working."}`.

---

## Step 2: Frontend Setup

Mobile application written in React Native with Expo Router.

1.  **Open a new terminal** in the mobile project folder (where `package.json` is located).

2.  **Install Node.js dependencies:**
    Use the `--legacy-peer-deps` flag to avoid React version conflicts.

    ```bash
    npm install --legacy-peer-deps
    ```

3.  **Install icons:**
    ```bash
    npx expo install @expo/vector-icons
    ```

---

## Step 3: Connection Configuration

For the phone to connect to the computer, they must be on the same Wi-Fi network, and you must provide the computer's IP address in the code.

1.  **Check your local IP:**
    * **Mac:** Type in terminal: `ipconfig getifaddr en0`
    * **Windows:** Type in terminal: `ipconfig` (look for IPv4 Address)
    * *Example:* `192.168.1.15`

2.  **Update the configuration file:**
    Open the file `app/(tabs)/recommendation.tsx` in your code editor.
    Find the line with `API_URL` and insert your address there:

    ```typescript
    // app/(tabs)/recommendation.tsx

    const API_URL = 'http://[YOUR_IP_ADDRESS:8000]/recommend';
    ```

3.  **Save the file.**

---

## Step 4: Running the Application

1.  In the frontend terminal, type:

    ```bash
    npx expo start -c
    ```
    *(The `-c` flag clears the cache, which prevents many errors).*

2.  **Run on device:**
    * **iOS Simulator:** Press the `i` key.
    * **Android Emulator:** Press the `a` key.
    * **Physical Device:** Scan the QR code with the Expo Go app (Android) or Camera (iOS).

---

## Troubleshooting

**Application shows "Network request failed"?**
1.  Ensure the phone and laptop are on the **same Wi-Fi network**.
2.  Check if the **Firewall** on the computer is blocking port 8000 (on Mac: Settings -> Network -> Firewall -> Turn Off).
3.  Ensure the Python server is running with the `--host 0.0.0.0` flag.

**"Unable to save asset" errors in Simulator?**
1.  In the Simulator menu, select: `Device` -> `Erase All Content and Settings`.
2.  Restart the Expo server (`npx expo start -c`).

**"Unmatched Route" errors?**
1.  Ensure the folder structure in `app/` is correct.
2.  Try restarting the server with cache clearing (`-c`).

---


# Program workflow
## Part 1. Data processing

1. Data preparation using Pandas (We used [Kaggle TMDB dataset](https://www.kaggle.com/datasets/asaniczka/tmdb-movies-dataset-2023-930k-movies)).
2. Using feature engineering we create "soup" of every dataset column besides title.
3. Using TF-IDF vectorizer to map words importance which creates a global sparse matrix (1.3M movies x 50k features).
2. Use cosine similarity to compare these vectors in our system (in our case its linear kernel because of TF-IDF utilization).

## Part 2. Recommendation system
1. System asks user for **2-5** favorite movies.
2. Using internal mapping it finds individual movie vector.
3. Creates a summarized vector of these 5 movies- that's **User Profile Vector**.
4. Using linear kernel to Compare UPV to other movies in dataset.
5. Finds 5 movies with most similar vectors and displays them.
