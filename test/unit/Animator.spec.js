import Animator from "../../src/Animator";
/* eslint-disable */


describe("Animator Test", function() {
	describe("test Animator initialize", function() {
		it ("should check Animator initialize", function() {
			const animator = new Animator({
				iterationCount: 3,
				delay: 1,
				fillMode: "forwards",
				direction: "none",
			});

			animator.setDuration(5);

			expect(animator.getDirection()).to.be.equals("none");
			expect(animator.getFillMode()).to.be.equals("forwards");
			expect(animator.getDelay()).to.be.equals(1);
			expect(animator.getIterationCount()).to.be.equals(3);
			expect(animator.getDuration()).to.be.equals(5);
			expect(animator.getActiveDuration()).to.be.equals(15);
			expect(animator.getTotalDuration()).to.be.equals(16);
		});
		it ("should check setter, getter", function() {
			const animator = new Animator({
				iterationCount: 3,
				delay: 1,
				fillMode: "forwards",
				direction: "none",
				duration: 5,
			});

			expect(animator.getPlayState()).to.be.equals("paused");
			expect(animator.getEasing()).to.be.equals(0);
			expect(animator.getEasingName()).to.be.equals("linear");
			expect(animator.getPlaySpeed()).to.be.equals(1);
			expect(animator.getDirection()).to.be.equals("none");
			expect(animator.getFillMode()).to.be.equals("forwards");
			expect(animator.getDelay()).to.be.equals(1);
			expect(animator.getIterationCount()).to.be.equals(3);
			expect(animator.getDuration()).to.be.equals(5);
			expect(animator.getActiveDuration()).to.be.equals(15);
			expect(animator.getTotalDuration()).to.be.equals(16);


			expect(animator.setEasing([0,0,1,1]).getEasingName()).to.be.equals("cubic-bezier(0,0,1,1)");
			expect(animator.setPlaySpeed(2).getPlaySpeed()).to.be.equals(2);
			expect(animator.setDirection("reverse").getDirection()).to.be.equals("reverse");
			expect(animator.setFillMode("backwards").getFillMode()).to.be.equals("backwards");
			expect(animator.setDelay(2).getDelay()).to.be.equals(2);
			expect(animator.setPlayState("running").getPlayState()).to.be.equals("running");
			expect(animator.setIterationCount(2).getIterationCount()).to.be.equals(2);
			expect(animator.setDuration(4).getDuration()).to.be.equals(4);
			expect(animator.getActiveDuration()).to.be.equals(8);
			expect(animator.getTotalDuration()).to.be.equals(10);
		});
		it ("should check duration", function() {
			const animator = new Animator({
				iterationCount: 3,
				delay: 1,
				fillMode: "forwards",
				direction: "none",
				duration: 5,
			});

			expect(animator.getDelay()).to.be.equals(1);
			expect(animator.getIterationCount()).to.be.equals(3);
			expect(animator.getDuration()).to.be.equals(5);
			expect(animator.getActiveDuration()).to.be.equals(15);
			expect(animator.getTotalDuration()).to.be.equals(16);

			animator.setDelay(4);
			expect(animator.getIterationCount()).to.be.equals(3);
			expect(animator.getDelay()).to.be.equals(4);
			expect(animator.getDuration()).to.be.equals(5);
			expect(animator.getActiveDuration()).to.be.equals(15);
			expect(animator.getTotalDuration()).to.be.equals(19);

			animator.setIterationCount("infinite");
			expect(animator.getIterationCount()).to.be.equals("infinite");
			expect(animator.getDuration()).to.be.equals(5);
			expect(animator.getActiveDuration()).to.be.not.finite;
			expect(animator.getTotalDuration()).to.be.not.finite;
		});
		it("should check isEnded, isPaused", function() {
			const animator = new Animator({
				delay: 1,
				fillMode: "forwards",
				direction: "none",
				duration: 5,
			});

			expect(animator.isEnded()).to.be.equals(true);
			expect(animator.isPaused()).to.be.equals(true);


			animator.setPlayState("running");

			expect(animator.isEnded()).to.be.equals(false);
			expect(animator.isPaused()).to.be.equals(false);

			animator.setTime(5);
			expect(animator.isEnded()).to.be.equals(true);
			animator.setTime(6);
			expect(animator.isEnded()).to.be.equals(true);
		});
		it ("should check iteration time", function () {
			const animator = new Animator({
				iterationCount: 3,
				delay: 1,
				fillMode: "forwards",
				direction: "none",
				duration: 0,
			});

			// When
			animator.setTime(0);
			const time = animator.getIterationTime();

			animator.setDuration(5);

			animator.setTime(4);
			const time2 = animator.getIterationTime();

			animator.setTime(8);
			const time3 = animator.getIterationTime();

			animator.setTime(12);
			const time4 = animator.getIterationTime();

			// Then
			expect(time).to.be.equals(0);
			expect(time2).to.be.equals(4);
			expect(time3).to.be.equals(3);
			expect(time4).to.be.equals(2);
		});
		it ("should check direction", function () {
			const animator = new Animator({
				iterationCount: 3,
				delay: 1,
				fillMode: "forwards",
				direction: "reverse",
				duration: 5,
			});

			// When
			const reversTime = animator.setTime(0).getIterationTime();
			const reversTime2 = animator.setTime(4).getIterationTime();
			const reversTime3 = animator.setTime(8).getIterationTime();
			const reversTime4 = animator.setTime(12).getIterationTime();

			animator.setDirection("alternate");
			const alternateTime = animator.setTime(0).getIterationTime();
			const alternateTime2 = animator.setTime(4).getIterationTime();
			const alternateTime3 = animator.setTime(8).getIterationTime();
			const alternateTime4 = animator.setTime(12).getIterationTime();


			animator.setDirection("alternate-reverse");
			const alternateReverseTime = animator.setTime(0).getIterationTime();
			const alternateReverseTime2 = animator.setTime(4).getIterationTime();
			const alternateReverseTime3 = animator.setTime(8).getIterationTime();
			const alternateReverseTime4 = animator.setTime(12).getIterationTime();


			// Then
			expect(reversTime).to.be.equals(5);
			expect(reversTime2).to.be.equals(1);
			expect(reversTime3).to.be.equals(2);
			expect(reversTime4).to.be.equals(3);

			expect(alternateTime).to.be.equals(0);
			expect(alternateTime2).to.be.equals(4);
			expect(alternateTime3).to.be.equals(2);
			expect(alternateTime4).to.be.equals(2);

			expect(alternateReverseTime).to.be.equals(5);
			expect(alternateReverseTime2).to.be.equals(1);
			expect(alternateReverseTime3).to.be.equals(3);
			expect(alternateReverseTime4).to.be.equals(3);
		});
		it ("should check fillMode", function () {
			const animator = new Animator({
				iterationCount: 3,
				delay: 1,
				fillMode: "",
				duration: 5,
			});

			// When
			const time = animator.setTime(0).getIterationTime();
			const time2 = animator.setTime(3).getIterationTime();
			const time3 = animator.setTime(5).getIterationTime();
			const time4 = animator.setTime(15).getIterationTime();

			animator.setFillMode("both");
			const bothTime = animator.setTime(-1).getIterationTime();
			const bothTime2 = animator.setTime(3).getIterationTime();
			const bothTime3 = animator.setTime(6).getIterationTime();
			const bothTime4 = animator.setTime(15).getIterationTime();

			// Then
			expect(time).to.be.equals(0);
			expect(time2).to.be.equals(3);
			expect(time3).to.be.equals(0);
			expect(time4).to.be.equals(0);

			expect(bothTime).to.be.equals(0);
			expect(bothTime2).to.be.equals(3);
			expect(bothTime3).to.be.equals(1);
			expect(bothTime4).to.be.equals(5);
		});
	});
	describe("test Animator event", function() {
		it("should check play", function(done) {
			const animator = new Animator({
				delay: 1,
				fillMode: "forwards",
				direction: "none",
				duration: 5,
			});

			animator.on("play", function() {
				done();
			})

			animator.play();
		});
		it("should check paused", function(done) {
			const animator = new Animator({
				delay: 1,
				fillMode: "forwards",
				direction: "none",
				duration: 5,
			});
			const paused = sinon.spy();
			const timeupdate = sinon.spy();

			animator.on("timeupdate", timeupdate);
			animator.on("paused", paused);
			animator.play();


			setTimeout(function() {
				animator.pause();
				expect(timeupdate.callCount).to.be.ok;
				expect(paused.calledOnce).to.be.true;
				expect(animator.isPaused()).to.be.true;
				expect(animator.isEnded()).to.be.false;
				animator.off();
				done();
			}, 1200);
		});
		it("should check ended (no delay)", function(done) {
			const animator = new Animator({
				fillMode: "forwards",
				direction: "none",
				duration: 2,
			});

			animator.on("ended", e => {
				expect(animator.isEnded()).to.be.true;
				expect(animator.isPaused()).to.be.true;
				expect(animator.isDelay()).to.be.false;
				animator.off();
				done();
			});
			animator.on("timeupdate", ({currentTime}) => {
				if (currentTime < animator.getActiveDuration()) {
					expect(animator.isEnded()).to.be.false;
					expect(animator.isPaused()).to.be.false;
				}
				expect(animator.isDelay()).to.be.false;
			});
			animator.play();
		});
		it("should check ended (delay)", function(done) {
			const animator = new Animator({
				delay: 1,
				fillMode: "forwards",
				direction: "none",
				duration: 2,
			});

			animator.on("ended", e => {
				expect(animator.isDelay()).to.be.false;
				expect(animator.isEnded()).to.be.true;
				expect(animator.isPaused()).to.be.true;
				animator.off();
				done();
			});
			animator.on("timeupdate", ({currentTime}) => {				
				if (currentTime < animator.getActiveDuration()) {
					expect(animator.isEnded()).to.be.false;
					expect(animator.isPaused()).to.be.false;
				}			
				
				if (currentTime > 0) {
					expect(animator.isDelay()).to.be.false;
				} else {
					expect(animator.isDelay()).to.be.true;
				}
			});
			animator.play();
		});
	});
});