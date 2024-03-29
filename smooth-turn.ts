//% block="Smooth turn"
//% advanced=true
//% color=#6699CC icon="\u21BB"
namespace smoothturn{

    function distanceOf(sprite:Sprite, location:tiles.Location) {
        return Math.sqrt(Math.pow(sprite.x - location.x, 2) + Math.pow(sprite.y - location.y, 2))
    }

    const EPSILON = 1.5


    //%block="is %sprite=variables_get(mySprite) close enough to tile center"
    //%blockid=iscloseenoughtotilecenter 
    export function isCloseEnoughToTileCenter(sprite:Sprite, epsilon:number=1.5):boolean {
        if(epsilon == NaN) {
            epsilon = EPSILON
        }
        let loc = tiles.locationOfSprite(sprite)    
        return distanceOf(sprite, loc) <= epsilon;
    }

    //%block="is location in $direction of %sprite=variables_get(mySprite)  wall tile"
    export function isWall(sprite:Sprite, direction:CollisionDirection):boolean {
        let loc = tiles.locationOfSprite(sprite)
        let targetLoc = tiles.locationInDirection(loc, direction)
        return tiles.tileIsWall(targetLoc)
    }

    //%block="align %sprite=variables_get(mySprite)  to tile center"
    export function alignToTileCenter(sprite:Sprite) {
        let loc = tiles.locationOfSprite(sprite)    
        sprite.setFlag(SpriteFlag.GhostThroughTiles, true)
        sprite.x = loc.x
        sprite.y = loc.y
        sprite.setFlag(SpriteFlag.GhostThroughTiles, false)
    }
    
    let _movingSprite:Sprite = null

    export function moveSprite(sprite:Sprite, vx:number, vy:number) {
        controller.moveSprite(sprite, vy, vy)
        _movingSprite = sprite
    }

    game.onUpdate(function(){
        if (_movingSprite != null) {
            if (controller.up.isPressed()) {
                if (isCloseEnoughToTileCenter(_movingSprite, 4) && !isWall(_movingSprite, CollisionDirection.Top) 
                    && _movingSprite.isHittingTile(CollisionDirection.Top)) {
                    alignToTileCenter(_movingSprite)
                    _movingSprite.y -= 1 //pushing in
                }
            } else 
            if (controller.right.isPressed()) {
                if (isCloseEnoughToTileCenter(_movingSprite, 4) && !isWall(_movingSprite, CollisionDirection.Right) 
                    && _movingSprite.isHittingTile(CollisionDirection.Right)) {
                    alignToTileCenter(_movingSprite)
                    _movingSprite.x += 1 //pushing in
                }
            } else 
            if (controller.down.isPressed()) {
                if (isCloseEnoughToTileCenter(_movingSprite, 4) && !isWall(_movingSprite, CollisionDirection.Bottom) 
                    && _movingSprite.isHittingTile(CollisionDirection.Bottom)) {
                    alignToTileCenter(_movingSprite)
                    _movingSprite.y += 1 //pushing in
                }
            } else
            if (controller.left.isPressed()) {
                if (isCloseEnoughToTileCenter(_movingSprite, 4) && !isWall(_movingSprite, CollisionDirection.Left) 
                    && _movingSprite.isHittingTile(CollisionDirection.Left)) {
                    alignToTileCenter(_movingSprite)
                    _movingSprite.x -= 1 //pushing in
                }
            }
        }
    })


}