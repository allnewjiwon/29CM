$(function(){

  //1. 헤더 이벤트

  let lastScroll = 0;

  $(window).scroll(function () {
    curr = $(this).scrollTop();
    // here = $('.sc-intro').offset().top;


    // if (curr >= here) {
    //   $('header').addClass('on');
    // } else {
    //   $('header').removeClass('on');
    // }

    if (curr > lastScroll) {
      $('header').addClass('hide');
    } else {
      $('header').removeClass('hide');
    }
    lastScroll = curr;
  })



/*  
  gsap.to() ~ 에게
  gsap.from() ~ 전 ~부터
  gsap.fromTo() ~부터~에게
 */

  // 2. 헤더 스태거 모션
  gsap.from('.header .flex-wrap > *',{ delay:0.5, opacity:0, stagger:0.3 })




  // 3. 인트로 텍스트 모션 
  gsap.set('.sc-intro .flex-line',{ yPercent:100,opacity:0 })
  gsap.set('.sc-intro .flex-line img',{ scale:0.3,opacity:0 })
  const introMotion = gsap.timeline({
    defaults:{
      stagger:0.2,
      opacity:1,
      duration: .7,
      // 공통
    }
  })

  introMotion
  .addLabel('a')
  .to('.sc-intro .flex-line',{ yPercent:0,  },'a')
  .to('.sc-intro .flex-line img',{ scale:1, },'a')

  // 4. 인트로 텍스트 스크럽 모션
  const introTextList = document.querySelectorAll('.sc-intro .box-wrap .overflow-hidden');
  introTextList.forEach(element => {
    dataX = element.dataset.x;
    // 엘리먼트에 dataset의 x값을 가지고 오세요
    gsap.to(element,{
      scrollTrigger:{
        trigger:".sc-intro .box-wrap",
        start:"0% 0%", //[트리거기준 꼭대기] [윈도우좌표 꼭대기]
        end:"100% 10%", //[트리거기준 꼭대기] [윈도우좌표 꼭대기]
        // markers:true,
        scrub:0.4,
      },
      xPercent:dataX
    })
  });
  




  /**
   * @인트로밑에이미지모션
   * @foreach문써야될때
   * 
   */

  // 5. 스티커 스크럽 모션
  const stickerList = document.querySelectorAll('.sticker .sticker-icon');
  stickerList.forEach(element => {
    dataX = element.dataset.x;
    dataY = element.dataset.y;
    gsap.to(element,{
      scrollTrigger:{
        trigger:".sc-intro .sticker",
        start:"30% 100%", //[트리거기준 꼭대기] [윈도우좌표 꼭대기]
        end:"100% 0%", //[트리거기준 꼭대기] [윈도우좌표 꼭대기]
        // markers:true,
        scrub:0.4,
      },
      xPercent:dataX,
      yPercent:dataY,
    })
  });



  /**
   * @텍스트모션크리에이트
   * @일회용모션이라scrub사용불가
   * 
   */
  
  // 6. sc-explain 텍스트 모션 
  gsap.set('.explain .overflow-hidden .txt-line',{ yPercent:200 })

  
  ScrollTrigger.create({
    trigger:".explain",
    start:"0% 80%", //[트리거기준 꼭대기] [윈도우좌표 꼭대기]
    end:"100% 0%", //[트리거기준 꼭대기] [윈도우좌표 꼭대기]
    // markers:true,
    // scrub:0.4,
    onEnter:function(){
      $('.explain').addClass('on');
      explainTextMotion.play();

    }
  })

  const explainTextMotion = gsap.timeline({
    paused:true,
  })
  explainTextMotion
  .addLabel('a')
  .to('.explain .overflow-hidden .txt-line',{ delay:0.5, yPercent:0, stagger:0.1, },'a')
  .to('.explain .pink-tag .bg',{ scaleX:1},'a+=1')
  .to('.explain .pink-tag span',{color:'#fff'},'a+=1.3')

// 


  // for (let i = 1; i < 5; i++) {
  //   console.log(i);
    
  // }

  /**
   * @텍스트모션크리에이트
   * 
   * 
   */

  // 6. 아치 섹션 클립패쓰 및 스크럽 모션
  gsap.utils.toArray('.arch .picture').forEach(element => {
    // queryselectorall과 동일 << gsap 방식으로

    gsap.to(element,{
      scrollTrigger:{
        trigger:element.parentElement,
        start:"0% 50%", //[트리거기준 꼭대기] [윈도우좌표 꼭대기]
        end:"100% 80%", //[트리거기준 꼭대기] [윈도우좌표 꼭대기]
        // markers:true,
        // scrub:0.4,
      },
      'clip-path': 'circle(71.4% at 49% 51%)'
      // 'clip-path': 'path(M 0 200 L 0,75 A 5,5 0,0,1 150,75 L 200 200 z)'
    })
// .arch .picture의 img = element.childNodes[1]
    gsap.to(element.childNodes[1],{
      scrollTrigger:{
        trigger:element.parentElement,
        start:"0% 100%", //[트리거기준 꼭대기] [윈도우좌표 꼭대기]
        end:"100% 0%", //[트리거기준 꼭대기] [윈도우좌표 꼭대기]
        // markers:true,
        scrub:0,
      },
      scale:1.5,
    })
  });



  /***
   * @루프모션
   * @공용으로 클레스만 맞춰서 쓰세요
   * 
   */
  

  // 7. 헤드라인 텍스트 스크럽 모션 (공통)

  gsap.utils.toArray('.feed .headline').forEach(element => {
    gsap.to(element,{
      scrollTrigger:{
        trigger:element.parentElement,
        start:"0% 100%", //[트리거기준 꼭대기] [윈도우좌표 꼭대기]
        end:"100% 0%", //[트리거기준 꼭대기] [윈도우좌표 꼭대기]
        // markers:true,
        scrub: 1,
      },
      xPercent:-100,
    })
  });

    



  /***
   * @루프모션
   * @공용으로 클레스만 맞춰서 쓰세요
   * 
   */

// 8. group-grid 텍스트 모션 (공통)

gsap.set('.column-left .title',{opacity:0, yPercent:100})
gsap.set('.column-left .desc span',{opacity:0, yPercent:100})
gsap.set('.column-left .note',{opacity:0, yPercent:100})

gsap.set('.column-right .title',{opacity:0, yPercent:100})
gsap.set('.column-right .wrap > *',{opacity:0, yPercent:100})


gsap.utils.toArray('.column-left .title').forEach(element => {
  gsap.to(element,{
    scrollTrigger:{
      trigger:element.parentElement.parentElement,
      start:"0% 50%", //[트리거기준 꼭대기] [윈도우좌표 꼭대기]
      end:"100% 80%",
      // markers:true,
    },

      yPercent:0, 
      opacity:1,
  
  })
});

gsap.utils.toArray('.column-left .desc span').forEach(element => {
  gsap.to(element,{
    scrollTrigger:{
      trigger:element.parentElement.parentElement.parentElement,
      start:"0% 50%", //[트리거기준 꼭대기] [윈도우좌표 꼭대기]
      end:"100% 80%",
      // markers:true,
    },

      yPercent:0, 
      opacity:1,
      stagger: .1,
      delay:.1
  
  })
});

gsap.utils.toArray('.column-left .note').forEach(element => {
  gsap.to(element,{
    scrollTrigger:{
      trigger:element.parentElement.parentElement,
      start:"0% 50%", //[트리거기준 꼭대기] [윈도우좌표 꼭대기]
      end:"100% 80%",
      // markers:true,
    },

      yPercent:0, 
      opacity:1,
      delay:.2
  
  })
});

gsap.utils.toArray('.column-right .title').forEach(element => {
  gsap.to(element,{
    scrollTrigger:{
      trigger:element.parentElement.parentElement,
      start:"0% 50%", //[트리거기준 꼭대기] [윈도우좌표 꼭대기]
      end:"100% 80%",
      // markers:true,
    },

      yPercent:0, 
      opacity:1,
      delay:.3
  
  })
});

gsap.utils.toArray('.column-right .wrap > *').forEach(element => {
  gsap.to(element,{
    scrollTrigger:{
      trigger:element.parentElement.parentElement.parentElement,
      start:"0% 50%", //[트리거기준 꼭대기] [윈도우좌표 꼭대기]
      end:"100% 80%",
      // markers:true,
    },
      stagger:.3,
      yPercent:0, 
      opacity:1,
      delay: .5
  
  })
});



// 9. dispersion-images (공통)


gsap.utils.toArray('.dispersion-images .img-box').forEach(element => {

  dataX = element.dataset.x;
  dataY = element.dataset.y;

  gsap.to(element,{
    scrollTrigger:{
      trigger:element.parentElement,
      // start:"0% 0%", //[트리거기준 꼭대기] [윈도우좌표 꼭대기]
      // end:"250% 10%", //[트리거기준 꼭대기] [윈도우좌표 꼭대기]
      
      start:'-90% top', //[트리거기준,윈도우기준]
      end:'200% top',
      // markers:true,
      scrub:1,
    },
    scale:1.2,
    xPercent:dataX,
    yPercent:dataY,
  })
});


// 10. steps 타이틀 텍스트 모션 (공통)
gsap.set('.steps .title', {opacity:0, yPercent: 100})
gsap.set('.steps .steps-list .steps-item', {opacity:0, yPercent: 100})
// gsap.set('.steps .steps-list span', {opacity:0})

gsap.utils.toArray('.steps .title').forEach(element => {
  gsap.to(element,{
    scrollTrigger: {
      trigger: element.parentElement.previousElementSibling,
      start: '40% 0%',
      end: '100% 0%',
      // markers: true,
    },
    opacity:1,
    yPercent:0,
  })

});

// 11. steps 컨텐츠 텍스트 모션 (공통)
$('.steps-list.scroll').each(function(i,el){
  parentEl = $(this).parents('.scroll-parent');
  txtEl =  $(this).find('.steps-item');
  lineEl = $(this).find('span')
  const stepsList = gsap.timeline({
    scrollTrigger: {
      trigger: parentEl,
      start: '-50% 0%',
      end: '100% 0%',
      // markers: true,
     
    },
  })
  stepsList
  .addLabel('a')
  .to(txtEl,{
    duration: .8,
    yPercent:0, 
    opacity:1,
    stagger: .1 
  },'a')
  .to(lineEl,{
    duration: .8,
    stagger: .1,
    width: '100%',
  },'a')
})


// 12. feed-footer 텍스트 스크롤 모션

gsap.set('.feed-footer .link-facebook .link-txt',{opacity:0 , yPercent:100})

$('.feed-footer .link-facebook.scroll').each(function(i,el){
  parentEl = $(this).parents('.scroll-parent');
  txtEl =  $(this).find('.link-txt');
  lineEl = $(this).find('.link-line')
  const feedFooter= gsap.timeline({
    scrollTrigger: {
      trigger: parentEl,
      start: '0% 50%',
      end: '100% 0%',
      // markers: true,
    },
  })
  feedFooter
  .addLabel('a')
  .to(txtEl,{
    duration: .8,
    yPercent:0, 
    opacity:1,
    stagger: .1 
  },'a')
  .to(lineEl,{
    duration: .8,
    stagger: .1,
    width: '100%',
  },'a+=.5')
})


// 13. 연도 텍스트 타임 모션
gsap.set('.years-num',{yPercent:100,opacity:0})



 const yearMotion = gsap.timeline({
    scrollTrigger:{
        trigger:'.conclusion .years',
        start:"0% 50%", //[트리거기준 꼭대기] [윈도우좌표 꼭대기]
        end:"100% 0%", //[트리거기준 꼭대기] [윈도우좌표 꼭대기]
        // markers:true,
        // scrub:30,
      },
  })
  
  yearMotion
  .to('.years-num',{yPercent:0,opacity:1,stagger:0.2,})
  .to('.years-num .df > *',{yPercent:-100, stagger: 0.4})


// 14. sc-conclusion 이미지 스크럽 모션

const conMotion = gsap.timeline({
  scrollTrigger:{
    trigger:".conclusion",
    start:"30% 30%",
    end:"100% 0%",
    scrub:1,
    // markers: true,
}
})
conMotion
.addLabel('a')
.to('.con-img',{yPercent:-50},'a')
.to('.con-img img',{scale:1.2},'a')


// 15. footer 루프 애니메이션
  gsap.to('.footer .area-hidden span',2, {xPercent:-100,repeat:-1,ease:'none'})

  gsap.to('.footer .txt-flow-area .link-home',20,{xPercent:-100,repeat:-1,ease:'none',})

})
  