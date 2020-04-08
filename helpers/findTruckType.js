const truckTypes = require('./truckTypes');

module.exports = (size, payload) => {
    if (
        size.length <= truckTypes.sprinter.length
        && size.width <= truckTypes.sprinter.width
        && size.height <= truckTypes.sprinter.height
        && payload <= truckTypes.sprinter.payload
    ) {
        return 'sprinter'
    }
    if (
        size.length <= truckTypes.smallStraight.length
        && size.width <= truckTypes.smallStraight.width
        && size.height <= truckTypes.smallStraight.height
        && payload <= truckTypes.smallStraight.payload
    ) {
        return 'smallStraight'
    }
    if (
        size.length <= truckTypes.largeStraight.length
        && size.width <= truckTypes.largeStraight.width
        && size.height <= truckTypes.largeStraight.height
        && payload <= truckTypes.largeStraight.payload
    ) {
        return 'largeStraight'
    }
    
    return null
};