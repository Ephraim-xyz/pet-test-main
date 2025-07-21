interface PersonalityType {
  code: string;
  name: string;
  subtitle: string;
  emoji: string;
  description: string;
  traits: string[];
}

interface Dimension {
  category: 'EI' | 'SN' | 'TF' | 'JP';
  leftLabel: string;
  rightLabel: string;
  percentage: number;
  color: string;
}

interface Suggestion {
  type: string;
  icon: string;
  title: string;
  description: string;
}

interface BreedInfo {
  name: string;
  emoji: string;
  matchLevel: string;
  description: string;
}

Page({
  data: {
    personalityType: {} as PersonalityType,
    dimensions: [] as Dimension[],
    suggestions: [] as Suggestion[],
    breedInfo: {} as BreedInfo,
    
    // 性格类型定义
    personalityTypes: {
      'ESTJ': {
        code: 'ESTJ',
        name: 'Guardian',
        subtitle: '守护领导型',
        emoji: '🐕‍🦺',
        description: '你的狗狗是典型的"守护领导者"，具有强烈的保护意识和领导能力。它们喜欢有规律的生活，对主人忠诚，同时具备很强的社交能力。',
        traits: ['忠诚', '领导力', '社交', '规律性']
      },
      'ESFJ': {
        code: 'ESFJ',
        name: 'Companion',
        subtitle: '温暖陪伴型',
        emoji: '🦮',
        description: '你的狗狗是"温暖的陪伴者"，极其依恋主人，具有很强的共情能力。它们总是能察觉到主人的情绪变化，并给予最温暖的陪伴。',
        traits: ['温暖', '共情', '依恋', '敏感']
      },
      'ENFJ': {
        code: 'ENFJ',
        name: 'Inspirer',
        subtitle: '活力鼓舞型',
        emoji: '🐕',
        description: '你的狗狗是"活力鼓舞者"，充满正能量，总能带动家庭氛围。它们既爱探索又重感情，是完美的家庭开心果。',
        traits: ['活力', '正能量', '探索', '感情丰富']
      },
      'ENTJ': {
        code: 'ENTJ',
        name: 'Commander',
        subtitle: '指挥官型',
        emoji: '🐺',
        description: '你的狗狗是天生的"指挥官"，具有强烈的领导欲望和探索精神。它们独立自主，喜欢挑战，是狗群中的天然领袖。',
        traits: ['领导力', '独立', '挑战性', '决断力']
      },
      'ISTJ': {
        code: 'ISTJ',
        name: 'Protector',
        subtitle: '忠诚守护型',
        emoji: '🐕‍🦺',
        description: '你的狗狗是"忠诚守护者"，稳重可靠，喜欢规律的生活。它们对主人绝对忠诚，是最值得信赖的伙伴。',
        traits: ['忠诚', '稳重', '可靠', '守护']
      },
      'ISFJ': {
        code: 'ISFJ',
        name: 'Caregiver',
        subtitle: '贴心照顾型',
        emoji: '🐩',
        description: '你的狗狗是"贴心照顾者"，极其细心温柔，总是默默关注着家人的需要。它们喜欢安静的陪伴，是最贴心的毛孩子。',
        traits: ['贴心', '温柔', '细心', '关怀']
      },
      'INFJ': {
        code: 'INFJ',
        name: 'Mystic',
        subtitle: '神秘直觉型',
        emoji: '🐶',
        description: '你的狗狗是"神秘的直觉者"，具有敏锐的直觉和深度的情感。它们能感知到人类察觉不到的细微变化，是很有灵性的伙伴。',
        traits: ['直觉', '敏锐', '深度', '灵性']
      },
      'INTJ': {
        code: 'INTJ',
        name: 'Strategist',
        subtitle: '策略思考型',
        emoji: '🐕',
        description: '你的狗狗是"策略思考者"，非常聪明独立，有自己的思考方式。它们喜欢观察和思考，是狗中的智者。',
        traits: ['聪明', '独立', '思考', '观察力']
      },
      'ESTP': {
        code: 'ESTP',
        name: 'Explorer',
        subtitle: '冒险探索型',
        emoji: '🐺',
        description: '你的狗狗是"冒险探索者"，充满活力和好奇心。它们喜欢新鲜事物，总是准备好下一次冒险，是最佳的户外伙伴。',
        traits: ['冒险', '活力', '好奇', '外向']
      },
      'ESFP': {
        code: 'ESFP',
        name: 'Entertainer',
        subtitle: '快乐表演型',
        emoji: '🎭',
        description: '你的狗狗是天生的"表演者"，总是能带来欢乐和惊喜。它们热爱社交，擅长用自己的方式娱乐大家。',
        traits: ['快乐', '表演', '社交', '娱乐']
      },
      'ENFP': {
        code: 'ENFP',
        name: 'Dreamer',
        subtitle: '梦想家型',
        emoji: '🌟',
        description: '你的狗狗是"梦想家"，充满想象力和创造力。它们对世界充满好奇，总是能发现生活中的美好。',
        traits: ['想象力', '创造力', '好奇', '乐观']
      },
      'ENTP': {
        code: 'ENTP',
        name: 'Innovator',
        subtitle: '创新先锋型',
        emoji: '💡',
        description: '你的狗狗是"创新先锋"，聪明机智，总是能想出新的玩法。它们喜欢挑战传统，是狗中的革新者。',
        traits: ['创新', '机智', '挑战', '革新']
      },
      'ISTP': {
        code: 'ISTP',
        name: 'Craftsman',
        subtitle: '技艺大师型',
        emoji: '🔧',
        description: '你的狗狗是"技艺大师"，冷静理性，擅长解决问题。它们喜欢独立思考，是最实用的伙伴。',
        traits: ['冷静', '理性', '解决问题', '独立']
      },
      'ISFP': {
        code: 'ISFP',
        name: 'Artist',
        subtitle: '艺术家型',
        emoji: '🎨',
        description: '你的狗狗是"艺术家"，敏感细腻，对美好的事物有独特的感受力。它们喜欢宁静的环境，是最有艺术气质的毛孩子。',
        traits: ['敏感', '细腻', '艺术', '宁静']
      },
      'INFP': {
        code: 'INFP',
        name: 'Idealist',
        subtitle: '理想主义型',
        emoji: '🌙',
        description: '你的狗狗是"理想主义者"，内心丰富，有着深层的情感世界。它们珍视和谐，是最纯真的灵魂伙伴。',
        traits: ['理想主义', '深层情感', '和谐', '纯真']
      },
      'INTP': {
        code: 'INTP',
        name: 'Thinker',
        subtitle: '思想家型',
        emoji: '🤔',
        description: '你的狗狗是"思想家"，喜欢独立思考和探索。它们对世界有自己独特的理解，是最有哲学气质的伙伴。',
        traits: ['思考', '探索', '独特', '哲学']
      }
    } as Record<string, PersonalityType>
  },

  onLoad() {
    this.calculateResults();
  },

  calculateResults() {
    const app = getApp();
    const answers = app.globalData?.testAnswers || [];
    const questions = app.globalData?.testQuestions || [];
    const dogBreed = app.globalData?.dogBreed || '';

    if (answers.length === 0) {
      wx.showToast({
        title: '请先完成测试',
        icon: 'none'
      });
      wx.navigateTo({
        url: '/pages/welcome/welcome'
      });
      return;
    }

    // 计算MBTI维度得分
    const scores = this.calculateMBTIScores(answers, questions);
    const personalityCode = this.generatePersonalityCode(scores);
    const personalityType = this.data.personalityTypes[personalityCode];
    const dimensions = this.generateDimensions(scores);
    const suggestions = this.generateSuggestions(personalityCode);
    const breedInfo = this.generateBreedInfo(dogBreed, personalityCode);

    this.setData({
      personalityType,
      dimensions,
      suggestions,
      breedInfo
    });

    // 启动动画效果
    this.startAnimations();
  },

  calculateMBTIScores(answers: number[], questions: any[]) {
    const scores: Record<string, number> = { EI: 0, SN: 0, TF: 0, JP: 0 };
    const counts: Record<string, number> = { EI: 0, SN: 0, TF: 0, JP: 0 };

    answers.forEach((answer, index) => {
      const question = questions[index];
      if (question) {
        const category: string = question.category;
        const direction: number = question.direction;
        
        // 计算得分 (1-5 转换为 -2 到 +2)
        let score = (answer - 3) * direction;
        
        scores[category] += score;
        counts[category]++;
      }
    });

    // 转换为百分比 (0-100)
    Object.keys(scores).forEach(key => {
      const totalPossible = counts[key] * 2; // 最大可能得分
      const normalizedScore = ((scores[key] + totalPossible) / (totalPossible * 2)) * 100;
      scores[key] = Math.round(normalizedScore);
    });

    return scores;
  },

  generatePersonalityCode(scores: any) {
    let code = '';
    code += scores.EI > 50 ? 'E' : 'I';
    code += scores.SN > 50 ? 'S' : 'N';
    code += scores.TF > 50 ? 'T' : 'F';
    code += scores.JP > 50 ? 'J' : 'P';
    return code;
  },

  generateDimensions(scores: any): Dimension[] {
    return [
      {
        category: 'EI',
        leftLabel: '依赖性',
        rightLabel: '独立性',
        percentage: scores.EI,
        color: 'linear-gradient(90deg, #3b82f6 0%, #1d4ed8 100%)'
      },
      {
        category: 'SN',
        leftLabel: '谨慎性',
        rightLabel: '探索性',
        percentage: scores.SN,
        color: 'linear-gradient(90deg, #10b981 0%, #047857 100%)'
      },
      {
        category: 'TF',
        leftLabel: '服从性',
        rightLabel: '自主性',
        percentage: scores.TF,
        color: 'linear-gradient(90deg, #8b5cf6 0%, #7c3aed 100%)'
      },
      {
        category: 'JP',
        leftLabel: '沉稳性',
        rightLabel: '兴奋性',
        percentage: scores.JP,
        color: 'linear-gradient(90deg, #f59e0b 0%, #d97706 100%)'
      }
    ];
  },

  generateSuggestions(personalityCode: string): Suggestion[] {
    // 根据性格类型生成建议
    const baseSuggestions = [
      {
        type: 'toy',
        icon: '🎾',
        title: '适合的玩具',
        description: '根据性格特点选择合适的玩具类型'
      },
      {
        type: 'activity',
        icon: '🚶‍♂️',
        title: '推荐活动',
        description: '符合性格的运动和活动方式'
      },
      {
        type: 'training',
        icon: '🎓',
        title: '训练要点',
        description: '针对性格特点的训练建议'
      }
    ];

    // 根据性格代码定制建议内容
    if (personalityCode.includes('E')) {
      baseSuggestions[0].description = '社交性强的互动玩具，如飞盘、球类';
      baseSuggestions[1].description = '群体活动、公园社交、敏捷训练';
    } else {
      baseSuggestions[0].description = '益智类独立玩具，如谜题、咀嚼玩具';
      baseSuggestions[1].description = '安静散步、家庭游戏、室内训练';
    }

    return baseSuggestions;
  },

  generateBreedInfo(breed: string, personalityCode: string): BreedInfo {
    if (!breed) return {} as BreedInfo;

    const breedEmojis: Record<string, string> = {
      '金毛寻回犬': '🦮',
      '泰迪': '🐩',
      '哈士奇': '🐺',
      '柴犬': '🐕',
      '边境牧羊犬': '🐕‍🦺',
      '拉布拉多': '🦮',
      '比熊': '🐩',
      '萨摩耶': '🐕',
      '德国牧羊犬': '🐕‍🦺',
      '混血犬': '🐶'
    };

    return {
      name: breed,
      emoji: breedEmojis[breed] || '🐕',
      matchLevel: '高度匹配',
      description: `测试结果与${breed}的典型性格特征高度吻合，这个品种通常具有与您观察到的行为模式相似的特点。`
    };
  },

  startAnimations() {
    // 启动进度条动画等
    setTimeout(() => {
      // 可以添加更多动画效果
    }, 500);
  },

  shareResults() {
    wx.showShareMenu({
      withShareTicket: true
    });
  },

  generateShareCard() {
    wx.showToast({
      title: '功能开发中',
      icon: 'none'
    });
  },

  restartTest() {
    wx.showModal({
      title: '重新测试',
      content: '确定要重新开始测试吗？当前结果将被清除。',
      success: (res) => {
        if (res.confirm) {
          // 清除数据
          const app = getApp();
          app.globalData = {};
          
          wx.reLaunch({
            url: '/pages/welcome/welcome'
          });
        }
      }
    });
  },

  goBack() {
    wx.navigateBack();
  }
}); 