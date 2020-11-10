// Add your code here
namespace smoothturn{

    function distanceOf(sprite:Sprite, location:tiles.Location) {
        return Math.sqrt(Math.pow(sprite.x - location.x, 2) + Math.pow(sprite.y - location.y, 2))
    }

    const EPSILON = 1.5


    //%block
    export function isCloseEnoughToTileCenter(sprite:Sprite) {
        let loc = tiles.locationOfSprite(sprite)    
        return distanceOf(sprite, loc) <= EPSILON;
    }

    //%block
    export function isWall(sprite:Sprite, direction:CollisionDirection) {
        let loc = tiles.locationOfSprite(sprite)
        return tiles.tileIsWall(tiles.locationInDirection(loc, direction))
    }

    //%block
    export function alignToTileCenter(sprite:Sprite) {
        let loc = tiles.locationOfSprite(sprite)    
        sprite.x = loc.x
        sprite.y = loc.y
    }

}