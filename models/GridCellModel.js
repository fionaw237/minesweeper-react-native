class GridCellModel {
    constructor(coordinate) {
        this.coordinate = coordinate
        this.hasMine = false
        this.hasFlag = false
        this.uncovered = false
        this.pressedForGameOver = false
        this.minesInVicinity = null
        this.state = "Covered"
    }
}

export default GridCellModel