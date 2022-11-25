import meilisearch
import json

client = meilisearch.Client('http://localhost:7700')

json_file = open('movies.json')
movies = json.load(json_file)
client.index('movies').add_documents(movies)
