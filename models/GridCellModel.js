class GridCellModel {
    constructor(coordinate) {
        this.coordinate = coordinate
        this.hasMine = false
        this.hasFlag = false
        this.uncovered = false
        this.pressedForGameOver = false
    }
}

export default GridCellModel