interface Breed {
  name: string;
  emoji: string;
}

Page({
  data: {
    inputValue: '',
    selectedBreed: '',
    displayBreeds: [] as Breed[],
    allBreeds: [
      { name: '金毛寻回犬', emoji: '🦮' },
      { name: '泰迪', emoji: '🐩' },
      { name: '哈士奇', emoji: '🐺' },
      { name: '柴犬', emoji: '🐕' },
      { name: '边境牧羊犬', emoji: '🐕‍🦺' },
      { name: '拉布拉多', emoji: '🦮' },
      { name: '比熊', emoji: '🐩' },
      { name: '萨摩耶', emoji: '🐕' },
      { name: '德国牧羊犬', emoji: '🐕‍🦺' },
      { name: '混血犬', emoji: '🐶' },
      { name: '博美', emoji: '🐕' },
      { name: '贵宾犬', emoji: '🐩' }
    ] as Breed[]
  },

  onLoad() {
    this.setData({
      displayBreeds: this.data.allBreeds.slice(0, 6) // 显示前6个热门品种
    });
  },

  onInputChange(e: any) {
    const value = e.detail.value;
    this.setData({
      inputValue: value,
      selectedBreed: value
    });
    
    // 如果有输入，进行搜索过滤
    if (value.trim()) {
      this.filterBreeds(value);
    } else {
      // 恢复显示热门品种
      this.setData({
        displayBreeds: this.data.allBreeds.slice(0, 6)
      });
    }
  },

  onInputFocus() {
    // 输入框获得焦点时的处理
  },

  onInputBlur() {
    // 输入框失去焦点时的处理
  },

  filterBreeds(keyword: string) {
    const filtered = this.data.allBreeds.filter(breed => 
      breed.name.includes(keyword)
    );
    
    this.setData({
      displayBreeds: filtered.length > 0 ? filtered : this.data.allBreeds.slice(0, 6)
    });
  },

  selectBreed(e: any) {
    const breed = e.currentTarget.dataset.breed;
    this.setData({
      selectedBreed: breed,
      inputValue: breed
    });

    // 触觉反馈
    wx.vibrateShort({
      type: 'heavy'
    });
  },

  clearSelection() {
    this.setData({
      selectedBreed: '',
      inputValue: '',
      displayBreeds: this.data.allBreeds.slice(0, 6)
    });
  },

  continueToResults() {
    // 保存品种信息到全局数据
    const app = getApp();
    app.globalData = app.globalData || {};
    app.globalData.dogBreed = this.data.selectedBreed;

    // 跳转到结果页
    wx.navigateTo({
      url: '/pages/results/results'
    });
  },

  skipBreed() {
    // 不选择品种，直接跳转到结果页
    const app = getApp();
    app.globalData = app.globalData || {};
    app.globalData.dogBreed = '';

    wx.navigateTo({
      url: '/pages/results/results'
    });
  },

  goBack() {
    wx.navigateBack();
  }
}); 