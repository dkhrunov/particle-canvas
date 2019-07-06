(function(){

	let canvas 	  = document.createElement('canvas'),
		ctx 	  = canvas.getContext('2d'),
		w 		  = canvas.width  = innerWidth,
		h		  = canvas.height = innerHeight,
		particles = [],
		prop	  = {
			bgColor				: 'rgba(17, 17, 19, 1)',
			particleColor		: 'rgba(255, 40, 40, 1)',
			particleRadius		: 3,
			particleCount		: 160,
			particleMaxVelocity : 0.5,
			lineLength			: 150,
			//particleLife		: 6,
		}

		document.querySelector('body').appendChild(canvas);

		function createParticles() {
			for (let i = 0; i < prop.particleCount; i++) {
				particles.push(new Particle);
			}
		}

		function checkScreenSize() {
			if (innerWidth >= '1020' || innerHeight >= '1360') {
				prop.particleCount = 160;
				particles.length = 0;
				console.log('large');
			} else if (innerWidth < '400' || innerHeight < '700') {
				prop.particleCount = 60;
				particles.length = 0;
				console.log('small');
			}
		}

		window.onresize = function() {
			checkScreenSize();
			createParticles();
			w = canvas.width  = innerWidth;
			h = canvas.height = innerHeight;
		};

		class Particle {
			constructor() {
				this.x = Math.random()*w;
				this.y = Math.random()*h;
				this.velocityX = Math.random() * (prop.particleMaxVelocity*2) - prop.particleMaxVelocity;
				this.velocityY = Math.random() * (prop.particleMaxVelocity*2) - prop.particleMaxVelocity;
				//this.life = Math.random() * prop.particleLife * 60;
			}

			position() {
				this.x + this.velocityX > w && this.velocityX > 0 || this.x + this.velocityX < 0 && this.velocityX < 0? this.velocityX *= -1 : this.velocityX;
				this.y + this.velocityY > h && this.velocityY > 0 || this.y + this.velocityY < 0 && this.velocityY < 0? this.velocityY *= -1 : this.velocityY;
				this.x += this.velocityX;
				this.y += this.velocityY;
			}

			reDraw() {
				ctx.beginPath();
				ctx.arc(this.x, this.y, prop.particleRadius, 0, Math.PI*2);
				ctx.closePath();
				ctx.fillStyle = prop.particleColor;
				ctx.fill();
			}

			/*
			reCalculateLife() {
				if (this.life < 1) {
					this.x = Math.random()*w;
					this.y = Math.random()*h;
					this.velocityX = Math.random() * (prop.particleMaxVelocity*2) - prop.particleMaxVelocity;
					this.velocityY = Math.random() * (prop.particleMaxVelocity*2) - prop.particleMaxVelocity;
					this.life = Math.random() * prop.particleLife * 60;
				}
				this.life--;
			}
			*/
		}

		function reDrawBackground() {
			ctx.fillStyle = prop.bgColor;
			ctx.fillRect(0, 0, w, h);
		}

		function drawLines() {
			let x1, y1, x2, y2, length, opacity;
			for (let i in particles) {
				for (let j in particles) {
					x1 = particles[i].x;
					y1 = particles[i].y;
					x2 = particles[j].x;
					y2 = particles[j].y;
					length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
					if (length < prop.lineLength) {
						opacity = 1 - length / prop.lineLength;
						ctx.lineWidth = '0.5';
						ctx.strokeStyle = 'rgba(255, 40, 40,'+opacity+')';
						ctx.beginPath();
						ctx.moveTo(x1, y1);
						ctx.lineTo(x2, y2);
						ctx.closePath();
						ctx.stroke();
					}
				}
			}
		}
			
		
		function reDrawParticles() {
			for (let i in particles) {
				//particles[i].reCalculateLife();
				particles[i].position();
				particles[i].reDraw();
			}
		}

		function loop() {
			reDrawBackground();
			reDrawParticles();
			drawLines();
			requestAnimationFrame(loop);
		}

		function init() {
			checkScreenSize();
			createParticles();
			loop();
		}

		init();
}());