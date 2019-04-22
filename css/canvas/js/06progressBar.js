/**
 * Created by Administrator on 2018/5/11.
 */
function progressBar( option ) {
    this._init( option );
};

progressBar.prototype = {
    _init: function ( option ) {
        this.x = option.x || 0;
        this.y = option.y || 0;
        this.w = option.width || 0;
        this.h = option.height || 0;
        this.fillStyle = option.fillStyle || 'red';

        this.strokeStyle = option.strokeStyle || 'red';
        // this.strokeWidth = option.strokeWidth;
        // this.fillWidth = option.fillWidth;

        var innerRect = new Konva.Rect({
            x: this.x,
            y: this.y,
            width: 0,
            height: this.h,
            fill: this.fillStyle,
            cornerRadius: 1/2 * this.h,

            id: 'innerRect',
            name: 'innerRect', // 可利用选择器选择
        });

        // this.innerRect = innerRect;

        var outerRect = new Konva.Rect({
            x: this.x,
            y: this.y,
            width: this.w,
            height: this.h,
            stroke: this.strokeStyle,
            cornerRadius: 1/2 * this.h,

        });

        this.group = new Konva.Group({
            x: 0,
            y: 0,
        });
        this.group.add( innerRect );
        this.group.add( outerRect );
    },

    addToGroup: function ( layer ) {
        layer.add( this.group );
    },

    changeValue: function ( val ) {
        if(val > 1){
            val = val / 100;
        };

        var fillWidth = this.w * val;
        var innerRect = this.group.findOne('#innerRect');

        innerRect.to({
            width: fillWidth,
            duration: .5,
            easing: Konva.Easings.EaseIn, // Back...会报错不能为负数
        });
    },
};

