<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cat Playing with Yarn Ball</title>
    <style>
        body {
            margin: 0;
            padding: 20px;
            background: linear-gradient(135deg, #663399, #8A2BE2);
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            font-family: Arial, sans-serif;
        }
        
        .container {
            text-align: center;
            background: white;
            padding: 20px;
            border-radius: 15px;
            box-shadow: 0 8px 20px rgba(0,0,0,0.1);
        }
        
        canvas {
            border: 3px solid #ddd;
            border-radius: 10px;
            background: #f9f9f9;
        }
        
        h1 {
            color: #555;
            margin-bottom: 10px;
        }
        
        .controls {
            margin-top: 15px;
        }
        
        button {
            background: #FF69B4;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
            margin: 0 5px;
            transition: background-color 0.3s;
        }
        
        button:hover {
            background: #FF1493;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🐱 Cat Playing with Yarn Ball 🧶</h1>
        <canvas id="catCanvas" width="600" height="400"></canvas>
        <div class="controls">
            <button onclick="toggleAnimation()">Pause/Resume</button>
            <button onclick="resetAnimation()">Reset</button>
        </div>
    </div>

    <script>
        const canvas = document.getElementById('catCanvas');
        const ctx = canvas.getContext('2d');
        
        let animationId;
        let isPlaying = true;
        let time = 0;
        
        // Cat properties
        const cat = {
            x: canvas.width / 2,
            y: canvas.height / 2 + 50,
            width: 120,
            height: 80
        };
        
        // Yarn ball properties
        const yarnBall = {
            x: canvas.width / 2,
            y: canvas.height / 2 - 60,
            radius: 25,
            angle: 0,
            orbitRadius: 40
        };
        
        // Paws properties
        const paws = {
            leftAngle: 0,
            rightAngle: Math.PI,
            speed: 0.15
        };
        
        // Tail properties
        const tail = {
            angle: 0,
            speed: 0.08
        };
        
        function drawCat() {
            ctx.save();
            ctx.translate(cat.x, cat.y);
            
            // Cat body (lying on back)
            ctx.fillStyle = '#FFA500';
            ctx.beginPath();
            ctx.ellipse(0, 0, cat.width/2, cat.height/2, 0, 0, Math.PI * 2);
            ctx.fill();
            
            // Cat belly (lighter color)
            ctx.fillStyle = '#FFE4B5';
            ctx.beginPath();
            ctx.ellipse(0, 5, cat.width/2.5, cat.height/2.5, 0, 0, Math.PI * 2);
            ctx.fill();
            
            // Cat ears FIRST - like the emoji 🐱
            ctx.fillStyle = '#FFA500';
            
            // Left ear - triangle pointing up
            ctx.beginPath();
            ctx.moveTo(-30, -cat.height/2 - 15); // base left
            ctx.lineTo(-15, -cat.height/2 - 40); // tip
            ctx.lineTo(-10, -cat.height/2 - 15);  // base right
            ctx.closePath();
            ctx.fill();
            
            // Right ear - triangle pointing up  
            ctx.beginPath();
            ctx.moveTo(10, -cat.height/2 - 15);   // base left
            ctx.lineTo(15, -cat.height/2 - 40);  // tip
            ctx.lineTo(30, -cat.height/2 - 15);  // base right
            ctx.closePath();
            ctx.fill();
            
            // Inner ears - pink triangles
            ctx.fillStyle = '#FFB6C1';
            
            // Left inner ear
            ctx.beginPath();
            ctx.moveTo(-27, -cat.height/2 - 18);
            ctx.lineTo(-15, -cat.height/2 - 35);
            ctx.lineTo(-13, -cat.height/2 - 18);
            ctx.closePath();
            ctx.fill();
            
            // Right inner ear
            ctx.beginPath();
            ctx.moveTo(13, -cat.height/2 - 18);
            ctx.lineTo(15, -cat.height/2 - 35);
            ctx.lineTo(27, -cat.height/2 - 18);
            ctx.closePath();
            ctx.fill();
            
            // Cat head (drawn AFTER ears so it doesn't cover them)
            ctx.fillStyle = '#FFA500';
            ctx.beginPath();
            ctx.ellipse(0, -cat.height/2 - 20, 35, 30, 0, 0, Math.PI * 2);
            ctx.fill();
            
            // Eyes (closed, content)
            ctx.strokeStyle = '#000';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(-8, -cat.height/2 - 25, 3, 0, Math.PI);
            ctx.stroke();
            
            ctx.beginPath();
            ctx.arc(8, -cat.height/2 - 25, 3, 0, Math.PI);
            ctx.stroke();
            
            // Nose
            ctx.fillStyle = '#FFB6C1';
            ctx.beginPath();
            ctx.moveTo(0, -cat.height/2 - 15);
            ctx.lineTo(-3, -cat.height/2 - 10);
            ctx.lineTo(3, -cat.height/2 - 10);
            ctx.closePath();
            ctx.fill();
            
            // Mouth (happy)
            ctx.strokeStyle = '#000';
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.arc(-4, -cat.height/2 - 8, 4, 0, Math.PI);
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(4, -cat.height/2 - 8, 4, 0, Math.PI);
            ctx.stroke();
            
            // Whiskers
            ctx.strokeStyle = '#000';
            ctx.lineWidth = 1;
            // Left whiskers
            ctx.beginPath();
            ctx.moveTo(-25, -cat.height/2 - 18);
            ctx.lineTo(-35, -cat.height/2 - 15);
            ctx.moveTo(-25, -cat.height/2 - 12);
            ctx.lineTo(-35, -cat.height/2 - 12);
            // Right whiskers
            ctx.moveTo(25, -cat.height/2 - 18);
            ctx.lineTo(35, -cat.height/2 - 15);
            ctx.moveTo(25, -cat.height/2 - 12);
            ctx.lineTo(35, -cat.height/2 - 12);
            ctx.stroke();
            
            ctx.restore();
        }
        
        function drawPaws() {
            // Left paw
            const leftPawX = cat.x + Math.cos(paws.leftAngle) * 30;
            const leftPawY = cat.y - 40 + Math.sin(paws.leftAngle) * 15;
            
            ctx.fillStyle = '#FFA500';
            ctx.beginPath();
            ctx.ellipse(leftPawX, leftPawY, 12, 8, paws.leftAngle + Math.PI/4, 0, Math.PI * 2);
            ctx.fill();
            
            // Left paw pads
            ctx.fillStyle = '#FFB6C1';
            for(let i = 0; i < 3; i++) {
                const padX = leftPawX + Math.cos(paws.leftAngle + i * 0.5 - 1) * 6;
                const padY = leftPawY + Math.sin(paws.leftAngle + i * 0.5 - 1) * 6;
                ctx.beginPath();
                ctx.arc(padX, padY, 2, 0, Math.PI * 2);
                ctx.fill();
            }
            
            // Right paw
            const rightPawX = cat.x + Math.cos(paws.rightAngle) * 30;
            const rightPawY = cat.y - 40 + Math.sin(paws.rightAngle) * 15;
            
            ctx.fillStyle = '#FFA500';
            ctx.beginPath();
            ctx.ellipse(rightPawX, rightPawY, 12, 8, paws.rightAngle - Math.PI/4, 0, Math.PI * 2);
            ctx.fill();
            
            // Right paw pads
            ctx.fillStyle = '#FFB6C1';
            for(let i = 0; i < 3; i++) {
                const padX = rightPawX + Math.cos(paws.rightAngle + i * 0.5 - 1) * 6;
                const padY = rightPawY + Math.sin(paws.rightAngle + i * 0.5 - 1) * 6;
                ctx.beginPath();
                ctx.arc(padX, padY, 2, 0, Math.PI * 2);
                ctx.fill();
            }
        }
        
        function drawTail() {
            ctx.save();
            ctx.translate(cat.x - cat.width/2, cat.y);
            
            const tailSwish = Math.sin(tail.angle) * 20;
            
            ctx.strokeStyle = '#FFA500';
            ctx.lineWidth = 8;
            ctx.lineCap = 'round';
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.quadraticCurveTo(-20, tailSwish - 20, -40, tailSwish - 10);
            ctx.stroke();
            
            // Tail tip
            ctx.fillStyle = '#FF8C00';
            ctx.beginPath();
            ctx.arc(-40, tailSwish - 10, 6, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.restore();
        }
        
        function drawYarnBall() {
            // Calculate yarn ball position (orbiting around cat's chest area)
            yarnBall.x = cat.x + Math.cos(yarnBall.angle) * yarnBall.orbitRadius;
            yarnBall.y = cat.y - 30 + Math.sin(yarnBall.angle) * 20;
            
            // Yarn ball base
            ctx.fillStyle = '#FF69B4';
            ctx.beginPath();
            ctx.arc(yarnBall.x, yarnBall.y, yarnBall.radius, 0, Math.PI * 2);
            ctx.fill();
            
            // Yarn strands texture
            ctx.strokeStyle = '#FF1493';
            ctx.lineWidth = 2;
            for(let i = 0; i < 6; i++) {
                const angle = (i * Math.PI) / 3 + time * 0.02;
                const x1 = yarnBall.x + Math.cos(angle) * (yarnBall.radius - 5);
                const y1 = yarnBall.y + Math.sin(angle) * (yarnBall.radius - 5);
                const x2 = yarnBall.x + Math.cos(angle) * (yarnBall.radius + 5);
                const y2 = yarnBall.y + Math.sin(angle) * (yarnBall.radius + 5);
                
                ctx.beginPath();
                ctx.moveTo(x1, y1);
                ctx.lineTo(x2, y2);
                ctx.stroke();
            }
            
            // Highlight
            ctx.fillStyle = '#FFB6C1';
            ctx.beginPath();
            ctx.arc(yarnBall.x - 8, yarnBall.y - 8, 5, 0, Math.PI * 2);
            ctx.fill();
            
            // Loose yarn strand
            ctx.strokeStyle = '#FF69B4';
            ctx.lineWidth = 3;
            ctx.lineCap = 'round';
            const strandLength = 40 + Math.sin(time * 0.05) * 10;
            const strandX = yarnBall.x + Math.cos(yarnBall.angle + Math.PI) * strandLength;
            const strandY = yarnBall.y + Math.sin(yarnBall.angle + Math.PI) * strandLength * 0.5;
            
            ctx.beginPath();
            ctx.moveTo(yarnBall.x, yarnBall.y);
            ctx.quadraticCurveTo(
                yarnBall.x + Math.cos(yarnBall.angle + Math.PI) * strandLength * 0.5,
                yarnBall.y + Math.sin(yarnBall.angle + Math.PI) * strandLength * 0.3 + Math.sin(time * 0.1) * 5,
                strandX,
                strandY
            );
            ctx.stroke();
        }
        
        function drawBackground() {
            // Floor
            ctx.fillStyle = '#E6E6FA';
            ctx.fillRect(0, canvas.height - 50, canvas.width, 50);
            
            // Scattered yarn pieces
            ctx.fillStyle = '#FF69B4';
            for(let i = 0; i < 8; i++) {
                const x = 50 + (i * 70) + Math.sin(time * 0.02 + i) * 5;
                const y = canvas.height - 30 + Math.cos(time * 0.03 + i) * 3;
                ctx.beginPath();
                ctx.arc(x, y, 3, 0, Math.PI * 2);
                ctx.fill();
            }
        }
        
        function animate() {
            if (!isPlaying) return;
            
            // Clear canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Draw background
            drawBackground();
            
            // Update animations
            time += 1;
            yarnBall.angle += 0.03;
            paws.leftAngle += paws.speed;
            paws.rightAngle += paws.speed;
            tail.angle += tail.speed;
            
            // Add some randomness to paw movement
            if(Math.random() < 0.02) {
                paws.speed = 0.1 + Math.random() * 0.1;
            }
            
            // Draw everything
            drawTail();
            drawCat();
            drawPaws();
            drawYarnBall();
            
            animationId = requestAnimationFrame(animate);
        }
        
        function toggleAnimation() {
            isPlaying = !isPlaying;
            if (isPlaying) {
                animate();
            }
        }
        
        function resetAnimation() {
            time = 0;
            yarnBall.angle = 0;
            paws.leftAngle = 0;
            paws.rightAngle = Math.PI;
            tail.angle = 0;
            paws.speed = 0.15;
        }
        
        // Start the animation
        animate();
    </script>
</body>
</html>