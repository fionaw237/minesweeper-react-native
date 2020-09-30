class GridCellModel {
    constructor(coordinate) {
        this.coordinate = coordinate
        this.hasMine = false
        this.hasFlag = false
        this.uncovered = false
    }
}

export default GridCellModel