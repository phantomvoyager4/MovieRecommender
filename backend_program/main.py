import pickle
import pandas as pd
import numpy as np
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from sklearn.metrics.pairwise import linear_kernel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


try:
    df = pd.read_pickle("movies_data.pkl")
    with open("tfidf_matrix.pkl", "rb") as f:
        tfidf_matrix = pickle.load(f)
except FileNotFoundError:
    print("ERROR: .pkl files not found.")

    df = pd.DataFrame()
    tfidf_matrix = None


class MovieRecommender:
    def __init__(self, dataframe, matrix):
        self.df = dataframe
        self.matrix = matrix

        self.indices = pd.Series(
            self.df.index,
            index=self.df['title'].apply(lambda x: str(x).lower().strip())
        ).drop_duplicates()

    def _normalize(self, title):
        return str(title).lower().strip()

    def get_recommendations(self, title_list, top_n=5):
        if self.matrix is None:
            return []

        valid_indices = []

        for title in title_list:
            norm_title = self._normalize(title)
            if norm_title in self.indices:
                idx = self.indices[norm_title]
                if isinstance(idx, pd.Series):
                    idx = idx.iloc[0]
                valid_indices.append(idx)

        if not valid_indices:
            return []

        user_vector = self.matrix[valid_indices].sum(axis=0)
        user_vector = np.asarray(user_vector).reshape(1, -1)
        cosine_sim = linear_kernel(user_vector, self.matrix).flatten()
        sim_scores = cosine_sim.argsort()[-(top_n + len(valid_indices)):][::-1]
        final_indices = [i for i in sim_scores if i not in valid_indices][:top_n]
        result_df = self.df.iloc[final_indices][['title', 'release_date', 'overview']].fillna("")
        return result_df.to_dict(orient='records')


recommender = MovieRecommender(df, tfidf_matrix)


class UserInput(BaseModel):
    movies: list[str]


@app.post("/recommend")
def get_recommendations(user_input: UserInput):
    print(user_input.movies)

    results = recommender.get_recommendations(user_input.movies)

    if not results:
        return {"status": "error", "message": "No recommendations found for the given titles."}

    return {"status": "success", "data": results}


@app.get("/")
def home():
    return {"message": "Server is running! Send POST to /recommend"}

