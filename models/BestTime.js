import BestTimes from "../screens/BestTimesScreen";

class BestTime {
    constructor(difficulty, name, time) {
        this.id = Math.random()
        this.difficulty = difficulty
        this.name = name
        this.time = time
    }
}

export default BestTime