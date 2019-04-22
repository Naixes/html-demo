/**
 * Created by Administrator on 2018/5/7.
 */
function Sprite( option ) {
    this._inite( option );
}

Sprite.prototype = {
    _inite : function ( option ) {
        this.w = option.width;
        this.h = option.height;
        this.drW = option.drWidth || 40;
        this.drH = option.drHeight || 65;
        this.drX = option.x === 0 ? 0 : (option.x || 0);
        this.drY = option.y === 0 ? 0 : (option.y || 0);
        this.fps = option.fps; //frame per second

        this._imgSrc = option._imgSrc;
        this._dirIndex = 0;
    },

    render : function ( ctx ) {
        var img = new Image();

        img.src = this._imgSrc;

        var self = this;
        var framIndex = 0;
        img.onload = function(){
            setInterval(function () {
                ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
                ctx.drawImage(
                    img,
                    self.w * framIndex,
                    self.h * self._dirIndex,
                    self.w,
                    self.h,
                    self.drX,
                    self.drY,
                    self.drW,
                    self.drH
                );
                framIndex++;
                framIndex %= 4;
            },1000 / self.fps);
        }
    },

    changeDir : function ( dir ) {
        if ( dir == 'left' ) {
            this._dirIndex = 1;
        };
        if ( dir == 'right' ) {
            this._dirIndex = 2;
        };
        if ( dir == 'up' ) {
            this._dirIndex = 3;
        };
        if ( dir == 'down' ) {
            this._dirIndex = 0;
        };
    }
}