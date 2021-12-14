export default class LastMayday {
  constructor(message) {
    this.message = message
  }
  palette() {
    return ({
      width: '800rpx',
      height: '1500rpx',
      views: [
        {
          type: 'image',
          url: '../../images/extension.png',
          css: {
            top: 0,
            left: 0,
            width: '800rpx',
            height: '1500rpx',
          }
        },
        {
          type: 'image',
          url: '../../images/extension_footer.png',
          css: {
            bottom: '250rpx',
            left: '50rpx',
            width: '710rpx',
            height: '200rpx',
          }
        },
        {
          type: 'image',
          url: this.message.avatarUrl || '',
          css: {
            bottom: '320rpx',
            left: '100rpx',
            borderRadius: '50%',
            border: '1rpx solid #722ED1',
            width: '86rpx',
            height: '86rpx'
          }
        },
        {
          type: 'image',
          url: '../../images/ewm.jpg',
          css: {
            top: '610rpx',
            left: '258rpx',
            width: '306rpx',
            height: '306rpx'
          }
        },
        {
          type: 'text',
          text: "用户昵称：",
          css: {
            right: '455rpx',
            bottom: '390rpx',
            color: '#AFAFAF',
            fontSize: '24rpx',
            maxLines: 1,
            textAlign: 'center'
          }
        },
        {
          type: 'text',
          text: this.message.nickName,
          css: {
            right: '485rpx',
            bottom: '340rpx',
            color: '#fff',
            fontSize: '30rpx',
            maxLines: 1,
            textAlign: 'center'
          }
        },
        {
          type: 'text',
          text: '邀请您扫码了解更多!',
          css: {
            right: '350rpx',
            bottom: '280rpx',
            fontSize: '24rpx',
            color: '#FFE013',
            lineHeight: '40rpx',
            maxLines: 1,
            textAlign: 'center'
          }
        },
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
