document.addEventListener('DOMContentLoaded', () => {
    // 导航菜单切换逻辑
    const menuToggle = document.querySelector('.menu-toggle');
    const navUl = document.querySelector('nav ul');

    menuToggle.addEventListener('click', () => {
        navUl.classList.toggle('show');
    });

    // 点击导航链接后关闭菜单
    document.querySelectorAll('nav ul li a').forEach(link => {
        link.addEventListener('click', () => {
            navUl.classList.remove('show');
        });
    });

    // 欢迎屏幕逻辑
    const welcomeScreen = document.getElementById('welcome-screen');
    const welcomeGreeting = document.getElementById('welcome-greeting');
    const welcomeMessage = document.getElementById('welcome-message');

    if (!sessionStorage.getItem('welcomeShown')) {
        welcomeScreen.style.display = 'flex';

        const hour = new Date().getHours();
        let greetings;
        if (hour < 2) {
            greetings = [
                "It's already the next day! Why are you still awake?!",
                "Wow, did you drink coffee today?",
                "You must be very tired, or are you completely awake?"
            ];
        } else if (hour < 6) {
            greetings = [
                "Haha, if you're staying up this late, you won't even be able to order McDonald's.",
                "Hey, why are you visiting this website at such an odd hour?",
                "Are you awake, or did you not sleep at all??"
            ];
        } else if (hour < 10) {
            greetings = [
                "Good morning! A new day is starting!",
                "Good morning, stay energetic today!",
                "Good morning, don't forget to have breakfast!",
                "Good morning, have a wonderful day!"
            ];
        } else if (hour < 11) {
            greetings = [
                "Such a dilemma! If you eat now, is it breakfast or lunch?"
            ];
        } else if (hour < 18) {
            greetings = [
                "Good afternoon! How about a cup of coffee?",
                "Afternoon time, want some dessert?",
                "Good afternoon, remember to get up and move around!",
                "Hi, it's tea time!"
            ];
        } else if (hour < 21) {
            greetings = [
                "Good evening! Have you had dinner?",
                "It's evening, now is the time that belongs to yourself!",
                "Spending your free time in the evening checking out my homepage?!",
                "Good evening, how was your day?",
                "Good evening! Why not check on Netflix to see if your favorite show has new episodes?"
            ];
        } else {
            greetings = [
                "How about some late-night snacks? McDonald's sounds good.",
                "It's late, aren't you going to sleep?",
                "Good evening, how was your day?",
                "Night has fallen, it's time to relax!"
            ];
        }

        const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
        welcomeGreeting.textContent = randomGreeting;

        setTimeout(() => {
            welcomeScreen.style.opacity = '0';
            setTimeout(() => {
                welcomeScreen.style.display = 'none';
            }, 500);
        }, 2000);

        sessionStorage.setItem('welcomeShown', 'true');
    } else {
        welcomeScreen.style.display = 'none';
    }

    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // 图片库设置
    function setupGallery(containerClass, imageClass, interval = 5000) {
        const container = document.querySelector(`.${containerClass}`);
        const images = container.querySelectorAll(`.${imageClass}`);
        let currentIndex = 0;
        let intervalId;

        const controls = document.createElement('div');
        controls.className = 'gallery-controls';
        controls.innerHTML = `
            <button class="gallery-control prev">&lt;</button>
            <button class="gallery-control next">&gt;</button>
        `;
        container.appendChild(controls);

        images[currentIndex].classList.add('active');

        function showImage(index) {
            images[currentIndex].classList.remove('active');
            currentIndex = (index + images.length) % images.length;
            images[currentIndex].classList.add('active');
        }

        function nextImage() {
            showImage(currentIndex + 1);
        }

        function prevImage() {
            showImage(currentIndex - 1);
        }

        controls.querySelector('.prev').addEventListener('click', () => {
            prevImage();
            resetInterval();
        });

        controls.querySelector('.next').addEventListener('click', () => {
            nextImage();
            resetInterval();
        });

        function startInterval() {
            intervalId = setInterval(nextImage, interval);
        }

        function resetInterval() {
            clearInterval(intervalId);
            startInterval();
        }

        container.addEventListener('mouseenter', () => clearInterval(intervalId));
        container.addEventListener('mouseleave', startInterval);

        startInterval();
    }

    setupGallery('image-gallery-wide', 'wide-image', 15000);
    setupGallery('image-gallery-tall', 'tall-image', 15000);

    // 滚动检测和动画触发
    const educationSection = document.querySelector('.education-section');
    
    function checkScroll() {
        const triggerBottom = window.innerHeight / 5 * 4;
        const educationTop = educationSection.getBoundingClientRect().top;

        if(educationTop < triggerBottom) {
            educationSection.classList.add('visible');
        }
    }

    window.addEventListener('scroll', checkScroll);
    checkScroll();

    // 移动设备触摸滑动支持
    const galleries = document.querySelectorAll('.image-gallery-wide, .image-gallery-tall');
    
    galleries.forEach(gallery => {
        let startX;
        let isSwiping = false;

        gallery.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isSwiping = true;
        });

        gallery.addEventListener('touchmove', (e) => {
            if (!isSwiping) return;
            const currentX = e.touches[0].clientX;
            const diff = startX - currentX;
            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    gallery.querySelector('.gallery-control.next').click();
                } else {
                    gallery.querySelector('.gallery-control.prev').click();
                }
                isSwiping = false;
            }
        });

        gallery.addEventListener('touchend', () => {
            isSwiping = false;
        });
    });

    // 技能弹出窗口逻辑
    const skillTags = document.querySelectorAll('.skill-tag');
    const popupOverlay = document.querySelector('.popup-overlay');
    const popupContent = document.querySelector('.popup-content');
    const popupTitle = document.getElementById('popup-title');
    const popupDescription = document.getElementById('popup-description');
    const closePopup = document.querySelector('.close-popup');

    const skillDetails = {
'ML&DL': `
TensorFlow: Deep understanding and application of TensorFlow for model construction and data processing, especially in high-performance and data-intensive computing projects. Utilized TensorFlow for model training and optimization in large language model research for venture capital decision-making.

PyTorch: Proficient in using PyTorch for scientific computing with tensors and building deep neural networks. Applied in Stock Price Prediction projects and research at the HPDIC laboratory.

XGBoost: Implemented XGBoost in the automated trading code section of the RITC competition to analyze existing information and predict next-day market conditions. Effectively applied in complex financial data analysis and market trend prediction.

Scikit-learn: Mastery in implementing machine learning algorithms using Scikit-learn, including classification, regression, clustering analysis, and dimensionality reduction techniques. Applied in multiple projects such as financial market analysis and data pattern recognition, providing efficient data preprocessing and model evaluation tools.

Keras: Extensively used Keras in deep learning projects, particularly with TensorFlow as the backend. Through Keras, I simplified the design and experimentation process of network architectures, rapidly implementing complex neural network models such as Convolutional Neural Networks (CNN) and Recurrent Neural Networks (RNN).
`,

'Python': `
NumPy: Proficient in NumPy, widely applied for efficient array and matrix computations. Used NumPy for data manipulation and mathematical operations in numerous data science and machine learning projects, providing a powerful mathematical framework to support complex scientific computations.

Pandas: Expert in Pandas, the go-to library for handling and analyzing structured data. Applied Pandas in financial data analysis, time series forecasting, and cross-domain data integration projects, leveraging its powerful data processing capabilities including data cleaning, transformation, and aggregation.

Matplotlib: Skilled in using Matplotlib for data visualization. Designed and generated various customized charts using Matplotlib, effectively supporting the presentation and interpretation of data analysis results, helping teams and clients intuitively understand data trends and insights.
`,

'JavaScript': `
React: Used React to build user interfaces in multiple projects, particularly in the LEAN Lab's webpage design, improving development efficiency and page maintainability through component-based development.

Vue.js: Developed dynamic web applications using Vue.js, familiar with its reactive and component-based architecture, capable of rapidly deploying efficient and easily maintainable frontend applications.

Node.js: Skilled in using Node.js for backend development, supporting server-side logic and database interactions for web applications, ensuring efficient data processing and transmission.
`,

'Generative AI': `
Generative AI: Deep understanding and successful application of generative AI technologies such as Generative Adversarial Networks (GANs) and Variational Autoencoders (VAEs). In multiple projects, I utilized these models for text-to-image generation and style transfer, demonstrating the power of generative AI in creating new content and data augmentation.

GANs: In working with Generative Adversarial Networks, I developed models to generate visually appealing images and meticulously fine-tuned and trained the models to ensure the quality and diversity of generated results.

VAEs: Utilized Variational Autoencoders for efficient data compression and generation. My work helped improve model stability and output quality, especially when dealing with complex datasets.

Text-to-Image Generation: In text-to-image generation projects, I applied advanced deep learning techniques to convert descriptive text into detailed images, showcasing the potential of AI in understanding and creating visual content.
`,

'Quantization': `
Model Efficiency: By implementing quantization techniques, I optimized models' storage requirements and computational speed, reducing dependence on hardware resources. This improvement not only enhanced model response time but also lowered operational costs.

Edge Deployment: In the process of deploying models to edge devices, I applied quantization methods to adjust and optimize models, ensuring high performance while reducing memory usage and energy consumption. This is crucial for real-time data processing and instant decision-making.

Performance Enhancement: Quantization techniques helped improve overall model performance by reducing the need for floating-point operations, making models run more efficiently on various hardware platforms. My work involved detailed parameter tuning and testing to achieve optimal quantization effects.
`,

'Quantitative Finance': `
Financial Modeling: Proficient in building and validating various financial models, including models for predicting market price fluctuations, evaluating correlations between different assets, and pricing options. Through these models, I can provide data support for decision-making and optimize investment strategies.

Risk Management: In risk management, I designed and implemented multiple models to quantify and control risk exposure of financial products. This includes assessment of market risk, credit risk, and liquidity risk, ensuring the robustness and compliance of investment portfolios.

Algorithmic Trading: In the field of algorithmic trading, I developed various automated trading systems using high-frequency data and advanced algorithms to execute trades, thereby improving trading efficiency and profitability. Through precise time series analysis and prediction, my strategies can find advantages in complex market environments.
`,

'Commodity Markets': `
Pricing Models: Proficient in various commodity pricing models, capable of analyzing and predicting price movements of commodities such as crude oil, metals, and agricultural products. These models helped me make quick and accurate trading decisions in competitions, enhancing investment returns.

Risk Management: In commodity market risk management, I developed risk mitigation strategies for extreme market conditions. This includes using derivatives to hedge against price volatility risks, ensuring the stability and sustainability of investment portfolios.

Market Analysis: Conducted in-depth analysis of commodity markets, identifying market trends and potential trading opportunities. Using advanced statistical techniques and market analysis tools, I can accurately forecast market directions and formulate effective trading strategies.
`,

'Git': `
Git: Proficient in using Git for version control in XXL laboratory and multiple group projects. Through Git, I managed a large number of code changes, supporting efficient team collaboration and continuous code integration.

Collaborative Development: In XXL laboratory and other project teams, I applied Git to implement code version control and collaborative development. By establishing clear branch management rules and merge strategies, I ensured code consistency and smooth project progress.

Deployment Workflows: Utilizing Git in conjunction with continuous integration/continuous deployment (CI/CD) processes, such as using GitHub Actions to automate build and deployment processes, accelerated the cycle from development to deployment, ensuring rapid iteration and stable operation of applications.
`,

'Vector Database': `
Vector Database: In the HPDIC laboratory, I extensively used vector databases to optimize the storage and retrieval of high-dimensional data. Implemented multiple vector database systems and effectively utilized the multi-head self-attention mechanism in Transformer models to efficiently reduce the dimensionality of scientific data, fundamentally improving database query efficiency and reducing query costs.

Efficient Data Storage and Retrieval: By applying Principal Component Analysis (PCA) techniques and Transformer models for data dimensionality reduction, I optimized data storage and query processes. This made vector databases like Pinecone and Milvus more efficient in storing and retrieving high-dimensional data, particularly suitable for complex machine learning and deep learning tasks.

Scalability and Performance: The successfully deployed multi-vector database solutions not only improved system scalability and performance but also significantly enhanced data access speed and reduced operational costs through fine-tuned indexing and optimized query mechanisms.

Application in AI and ML: In AI and ML applications, through the use of precise vector representations and Transformer models, similarity search and data clustering tasks were effectively executed, thereby enhancing model accuracy and application versatility, especially demonstrating significant efficiency in scientific data analysis.
`,

'Industry Analysis': `
Industry Analysis: During my internship at CICC, I conducted in-depth industry analysis using advanced financial analysis techniques and data query tools to evaluate market trends and company competitive positions. I focused on comparable company valuation, using Excel for complex financial data analysis and model building, providing precise market insights and investment decision support.

Comparable Company Valuation: Expert in comparable company valuation methods, which include analyzing the financial performance of other companies in the same industry and assessing their market value. Through this method, I was able to provide clients with detailed assessments of potential investment targets, helping them understand market dynamics and valuation trends.

Financial Statement Analysis: Utilized Excel for detailed financial statement analysis, evaluating companies' financial health. This includes in-depth analysis of income statements, balance sheets, and cash flow statements, revealing companies' operational efficiency, profitability, and financial stability.

Data Query Capabilities: In my work at CICC, I demonstrated excellent data query and processing abilities, efficiently retrieving and integrating key data from various internal and external databases, providing a solid data foundation for complex industry analysis and report preparation.
`,

'Prompt Engineering': `
Prompt Engineering: In projects using large language models (LLMs) like GPT-3.5, I focused on designing efficient prompts to optimize model performance. Through refined prompt engineering techniques, I can guide models to generate more relevant and precise outputs, enhancing the effectiveness of decision support systems.

Effective Prompt Design: Proficient in designing and testing various prompts to extract and generate target information. This involves understanding and applying the internal working mechanisms of models to ensure each prompt accurately triggers the desired model response.

Customization for Specific Tasks: In venture capital decision support projects, I customized prompts according to specific application needs, enabling models to evaluate the potential or effectiveness of startup investment proposals. This customized prompt design significantly improved the quality and speed of decision-making.

Adaptation and Optimization: In projects at the HPDIC laboratory, I obtained optimized embedding vectors by adjusting the input format and processing method of scientific data, enhancing data expressiveness and model application effects. These adjustments and optimizations enhanced the expressive power of data in language models, thereby effectively improving the model's understanding and processing capabilities for complex data patterns.
`,

'Fine-tuning': `
Fine-tuning: Implemented fine adjustments on various pre-trained models to adapt to specific downstream tasks. By adjusting model parameters and layer structures, I can significantly improve model performance and accuracy in specific applications.

Task-Specific Adjustments: I focus on customizing and optimizing pre-trained models for specific tasks such as text classification, sentiment analysis, or image recognition. Through precise tuning and retraining, I ensure that models can understand and process specific types of data and requirements.

Performance Optimization: In HPDIC laboratory and other projects, I used deep learning techniques to optimize model performance, especially through the laboratory's high-performance computing resources. This includes selecting appropriate learning rates, adjusting loss functions, and using advanced regularization techniques to prevent overfitting.

Real-World Application: My fine-tuning work is not limited to laboratory tests but has been successfully applied in actual business and scientific applications, such as using fine-tuned models in venture capital decision-making and scientific data analysis to enhance the data-driven nature and accuracy of decisions.
`,

'NLP': `
Natural Language Processing (NLP): Deep understanding of natural language processing and application of Hugging Face's transformers library in multiple projects. I use these advanced tools to implement NLP tasks such as text classification, named entity recognition, sentiment analysis, and language generation.

Transformers and Hugging Face Hub: Skilled in using the transformers library, which provides a wide range of pre-trained models such as BERT and GPT, supporting efficient model fine-tuning and deployment. Through Hugging Face Hub, I manage and deploy NLP models, ensuring model accessibility and reusability.

Sentiment Analysis and Entity Recognition: Utilize transformers to perform sentiment analysis and named entity recognition, accurately capturing emotions and important entities in text data. These techniques make the analysis of everything from user comments to news reports more precise, providing data support for decision-making.

Advanced NLP Applications: Explored and implemented various advanced NLP applications based on transformers, such as dialogue systems and automatic text summarization. These applications not only enhanced the naturalness of interactions but also optimized information retrieval and processing workflows.
`,

'Optimization': `
Linear Optimization: In linear optimization, I designed and implemented various models to solve resource allocation and cost minimization problems. This includes using simplex method and interior point methods to find optimal solutions, ensuring operational efficiency and economy.

Nonlinear Optimization: In nonlinear optimization projects, I dealt with optimization problems with complex constraints and objective functions. Through techniques such as gradient descent, Newton's method, and quasi-Newton methods, I can effectively find local or global optimal solutions.

Discrete Optimization: In the field of discrete optimization, I focus on solving optimization problems involving integer variables, such as scheduling, routing, and inventory management. Applying branch and bound method and cutting plane method, I improved the computational efficiency and practicality of solutions to these problems.
`,

'HTML': `
HTML: Proficient in using HTML5 to develop web pages, with practical experience in creating public websites for LEAN learning in the Experimental Lean Lab (XXL) and personal projects. I utilized HTML to build structured and responsive websites, providing excellent user interaction experience and information accessibility.

Web Development: In the XXL laboratory project, I was responsible for designing and implementing the frontend development of the LEAN language learning platform. This platform not only supports online learning but also provides interactive features, enabling users to learn and practice the LEAN language more effectively.

Responsive Design: I developed responsive web pages using HTML5 in combination with CSS3 and JavaScript technologies, adapting to different devices. This ensures that the website provides a consistent user experience whether on desktop or mobile devices.

Accessibility: Focused on website accessibility, ensuring that all users, including those with special needs, can access website content without barriers. I followed the W3C Web Content Accessibility Guidelines (WCAG) to provide users with easy-to-navigate and use web pages.
`
    };

    skillTags.forEach(tag => {
            tag.addEventListener('click', () => {
                const skill = tag.textContent;
                popupTitle.textContent = skill;
                
                if (skillDetails[skill]) {
                    const description = skillDetails[skill].split('\n\n').map(paragraph => {
                        const [category, ...content] = paragraph.split(':');
                        if (content.length) {
                            return `<div class="skill-category">${category}:</div>${content.join(':')}`;
                        }
                        return paragraph;
                    }).join('\n\n');
                    
                    popupDescription.innerHTML = description;
                } else {
                    popupDescription.textContent = 'Description not available.';
                }
                
                popupOverlay.style.display = 'block';
                setTimeout(() => {
                    popupOverlay.classList.add('active');
                }, 10);
            });
        });

        function closePopupHandler() {
            popupOverlay.classList.remove('active');
            setTimeout(() => {
                popupOverlay.style.display = 'none';
            }, 300);
        }

        closePopup.addEventListener('click', closePopupHandler);

        popupOverlay.addEventListener('click', (e) => {
            if (e.target === popupOverlay) {
                closePopupHandler();
            }
        });

        // ML&DL 技能展示逻辑
        const skillSubitems = document.querySelectorAll('.skill-subitem');

        skillSubitems.forEach(item => {
            const title = item.querySelector('.skill-subitem-title');
            title.addEventListener('click', () => {
                item.classList.toggle('active');
            });
        });
    });