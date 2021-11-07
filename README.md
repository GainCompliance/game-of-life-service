# Gain's Game of Life Service

This is a very simple service that we use as an interview exercise. This is a [Conway's Game of Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life) environment generator and viewer. (Note: it does not evaluate the world)

It supports four API endpoints, all accessible via simple GETs and POSTs.

The live server is available at [https://game-of-life-service-ai3nmiz7aa-uc.a.run.app](https://game-of-life-service-ai3nmiz7aa-uc.a.run.app).

## 1. `GET /world`
will return a 302 redirect to a url to create a unique world.

## 2. `GET /world/:id`
Will return a json object for a world seeded with this id. The response contains 4 keys, all of these will vary based on the id generated.

* `id` – the unique ID for this world
* `generationCount` – the number of generations to run on this world
* `size` – the height and width of this world, note it's always a square, so only a single number is returned.
* `world` – a 2 dimensional array filled with 1 to denote life and 0 for no life.

```json
{
  "id": "abc123",
  "generationCount": 5,
  "size": 5,
  "world": [[1,0,0,0,1],
            [1,0,0,1,1],
            [1,0,1,0,0],
            [1,1,0,1,1],
            [1,0,1,0,0]]
}
```

With this information you can now build a really fun game of life simulator in any language you'd like.

## 3. `POST /results`
A post to this endpoint with the correct JSON body will save the results, and redirect you to the viewer for your run. This endpoint expects a post body with the following keys:

* `id` - the id recieved from the server to generate the starting world
* `generationCount` – the number of generations you ran.
* `generations` - an array of worlds (2d array), each one representing a generation (tick or run) of the world following [conway's game of life rules](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life#Rules)

If the JSON post is correct, it will respond with a 302 redirect to a webpage that allows you to explore your results.

Below is a sample response to this endpoint _(note in this example the generations do not match the game of life rules.)_

```json
{
  "id": "abc123",
  "generationCount": 5,
  "generations": [
    [[1,0,0,0,1],
     [1,0,0,1,1],
     [1,0,1,0,0],
     [1,1,0,1,1],
     [1,0,1,0,0]],
    [[1,0,0,0,1],
     [1,0,0,1,1],
     [1,0,1,0,0],
     [1,1,0,1,1],
     [1,0,1,0,0]],
    [[1,0,0,0,1],
     [1,0,0,1,1],
     [1,0,1,0,0],
     [1,1,0,1,1],
     [1,0,1,0,0]],
    [[1,0,0,0,1],
     [1,0,0,1,1],
     [1,0,1,0,0],
     [1,1,0,1,1],
     [1,0,1,0,0]],
    [[1,0,0,0,1],
     [1,0,0,1,1],
     [1,0,1,0,0],
     [1,1,0,1,1],
     [1,0,1,0,0]],
  ]
}
```

## 4. `GET /viewer/:id`
Access this via a browser to interact with the runs of your latest submission. The id is the unique returned from a correct submission to `POST /results`.

![](https://cln.sh/l4yw0C)


# Local Development

1. Clone the code, `git clone git@github.com:GainCompliance/game-of-life-service.git`
2. Install npm dependencies `npm install`
3. Copy `.env.sample` to `.env` and update the values
3. Run with `npm run dev`

# Deployment

Commits to main will automatically be deployed to https://game-of-life-service-ai3nmiz7aa-uc.a.run.app
