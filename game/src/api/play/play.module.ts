import { Router } from "express";

export class PlayModule {
  private router: Router;
  constructor() {
    this.router = Router();
  }

  init() {
    this.router.post("/play", (req, res) => {
      const { bet } = req.body;

      console.log(bet);

      res.sendStatus(200);
    });

    return this.router;
  }
}
