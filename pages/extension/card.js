export default class LastMayday {
  constructor(message) {
    this.message = message
  }
  palette() {
    return ({
      width: '640rpx',
      height: '868rpx',
      background: '#fff',
      borderRadius: '32rpx',
      views: [
        {
          type: 'image',
          url: '../../images/poster-bg.jpg',
          css: {
            top: 0,
            left: 0,
            width: '640rpx',
            height: '868rpx',
          }
        },
        {
          type: 'text',
          text: '壹燕心选',
          css: {
            top: '36rpx',
            left: '0',
            width: '640rpx',
            height: '50rpx',
            color: '#fff',
            fontSize: '36rpx',
            lineHeight: '50rpx',
            textAlign: 'center'
          }
        },
        {
          type: 'rect',
          css: {
            top: '112rpx',
            left: '36rpx',
            width: '560rpx',
            height: '710rpx',
            color: '#fff',
            borderRadius: '16rpx'
          }
        },
        {
          type: 'image',
          url: this.message.avatar_url || '../../images/avatar.png',
          css: {
            top: '172rpx',
            left: '240rpx',
            borderRadius: '50%',
            width: '160rpx',
            height: '160rpx'
          }
        },
        {
          type: 'text',
          text: (this.message.name || this.message.nick_name) + '为您推荐',
          css: {
            top: '362rpx',
            left: '0',
            width: '640rpx',
            height: '50rpx',
            color: '#333',
            fontSize: '36rpx',
            lineHeight: '50rpx',
            lineHeight: '40rpx',
            textAlign: 'center',
          }
        },
        {
          type: 'text',
          text: '扫码了解更多',
          css: {
            right: '0rpx',
            bottom: '72rpx',
            width: '640rpx',
            height: '30rpx',
            fontSize: '28rpx',
            color: '#999',
            lineHeight: '40rpx',
            maxLines: 1,
            textAlign: 'center'
          }
        },
        {
          type: 'image',
          url: this.message.qrcode,
          css: {
            bottom: '128rpx',
            right: '180rpx',
            width: '280rpx',
            height: '280rpx'
          }
        }
      ],
    });
  }
}

const startTop = 50;
const startLeft = 20;
const gapSize = 70;
const common = {
  left: `${startLeft}rpx`,
  fontSize: '40rpx',
};

function _textDecoration(decoration, index, color) {
  return ({
    type: 'text',
    text: decoration,
    css: [{
      top: `${startTop + index * gapSize}rpx`,
      color: color,
      textDecoration: decoration,
    }, common],
  });
}

function _image(index, rotate, borderRadius) {
  return (
    {
      id: `image-${index}`,
      type: 'image',
      url: '../../images/poster-bg.jpg',
      css: {
        top: `${startTop + 8.5 * gapSize}rpx`,
        left: `${startLeft + 160 * index}rpx`,
        width: '120rpx',
        height: '120rpx',
        shadow: '10rpx 10rpx 5rpx #888888',
        rotate: rotate,
        minWidth: '60rpx',
        borderRadius: borderRadius,
        scalable: true,
      },
    }
  );
}

function _des(index, content) {
  const des = {
    type: 'text',
    text: content,
    css: {
      fontSize: '22rpx',
      top: `${startTop + 8.5 * gapSize + 140}rpx`,
    },
  };
  if (index === 3) {
    des.css.right = '60rpx';
  } else {
    des.css.left = `${startLeft + 120 * index + 30}rpx`;
  }
  return des;
}
