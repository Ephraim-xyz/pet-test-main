Page({
  data: {},

  onLoad() {
    console.log('Welcome page loaded');
  },

  startTest() {
    wx.navigateTo({
      url: '/pages/questionnaire/questionnaire'
    });
  }
}); 