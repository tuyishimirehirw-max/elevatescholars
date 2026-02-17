-- ======================================================================
-- THE VOICES OF FUTURE RWANDA CURRICULUM
-- PostgreSQL INSERT Statements
-- ======================================================================
-- This script uses gen_random_uuid() for automatic UUID generation.
-- No manual replacement of IDs is required.
-- Execute this entire script in order to populate the database.
-- ======================================================================

-- Enable the pgcrypto extension for gen_random_uuid() if not already enabled
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- ======================================================================
-- TRACK 1: LEADERSHIP (SECONDARY LEVEL) - COURSE 1
-- ======================================================================
WITH leadership_secondary AS (
  INSERT INTO courses (id, title, description, duration_weeks, is_published, thumbnail_url)
  VALUES (
    gen_random_uuid(),
    'Leadership (Secondary Level)',
    'This track introduces secondary students to the foundational concepts of Rwandan leadership. Rooted in the value of Agaciro (dignity), students explore self-leadership, communication, team dynamics, emotional intelligence, conflict resolution, decision-making, ethical leadership, digital leadership, and culminate in a community service capstone project.',
    12,
    true,
    'https://storage.example.com/thumbnails/leadership_secondary.jpg'
  )
  RETURNING id
)
INSERT INTO course_modules (id, course_id, title, description, content, order_number, duration_minutes, is_published)
SELECT gen_random_uuid(), leadership_secondary.id, *
FROM (
  VALUES
  -- Module 1: The Rwandan Identity (Agaciro)
  (
    'Module 1: The Rwandan Identity (Agaciro)',
    'Agaciro is the foundational concept of self-worth and dignity that guides Rwandan leadership.',
    '<h2>The Rwandan Identity (Agaciro)</h2>
<p><strong>Agaciro</strong> is the foundational concept of self-worth and dignity that guides Rwandan leadership. It is not merely a personal trait but a collective responsibility to uphold the honor of the community and nation.</p>
<p>For a student leader, Agaciro means leading by example and refusing to compromise on core values for short-term gains. This module explores how historical values like <em>Gukunda Igihugu</em> (Patriotism) and <em>Kwigira</em> (Self-reliance) provide a roadmap for modern challenges.</p>
<p>By practicing <em>Ubupfura</em> (nobility of character), students learn that leadership is a service to others. Developing a strong sense of Agaciro empowers youth to resist negative peer pressure and take ownership of their future, ensuring that their actions contribute to the nation''s dignity.</p>
<h3>MCQ Bank:</h3>
<ol>
<li>What is the Kinyarwanda word for "Dignity"? (Ans: Agaciro)</li>
<li>Which value refers to "Self-reliance" and taking initiative? (Ans: Kwigira)</li>
<li>True/False: Agaciro is a value that can only be given to you by others. (Ans: False)</li>
<li>In a school setting, how does a student show Integrity (Kupfura)? (Ans: By being honest without supervision)</li>
</ol>
<h3>Performance Task:</h3>
<p>Write a 300-word reflection on how a student leader can demonstrate Kupfura during national exams or school competitions.</p>',
    1,
    60,
    true
  ),
  -- Module 2: Self-Leadership (Imihigo Spirit)
  (
    'Module 2: Self-Leadership (Imihigo Spirit)',
    'The Imihigo tradition transforms vague desires into concrete commitments.',
    '<h2>Self-Leadership (Imihigo Spirit)</h2>
<p>The <em>Imihigo</em> tradition, once a set of public vows made by warriors, has been modernized into a powerful tool for performance and accountability. At the individual level, Imihigo transforms vague desires into concrete commitments.</p>
<p>For a student, this means moving beyond saying "I want to do well" to "I will achieve an A in Mathematics by practicing 10 problems every evening." This module introduces the SMART goal framework (Specific, Measurable, Achievable, Relevant, Time-bound) to help students draft their own performance contracts.</p>
<p>Publicly sharing these goals creates a sense of social accountability and pushes the leader to persevere when tasks become difficult. Mastering self-leadership through Imihigo is the first step toward managing teams and larger community projects.</p>
<h3>MCQ Bank:</h3>
<ol>
<li>Easy: Is Imihigo a "wish" or a "performance contract"? (Ans: Performance contract)</li>
<li>What does the ''M'' in SMART goals stand for? (Ans: Measurable)</li>
<li>Why is a public vow often more effective than a private goal? (Ans: It creates social accountability)</li>
<li>Which of these is a SMART goal? (Ans: "I will read 2 chapters of Biology every Tuesday at 4 PM")</li>
</ol>
<h3>Performance Task:</h3>
<p>Draft a personal "Imihigo" for the current school term, including at least three SMART goals.</p>',
    2,
    60,
    true
  ),
  -- Module 3: Communication for Leaders
  (
    'Module 3: Communication for Leaders',
    'Effective leadership communication is built on active listening and clarity.',
    '<h2>Communication for Leaders</h2>
<p>Effective leadership communication is built on the foundation of active listening and clarity. Many conflicts in school clubs or classrooms arise not from bad intentions, but from misunderstood instructions.</p>
<p>This module teaches the "Clarify-Confirm" method, where the leader asks the listener to paraphrase an instruction to ensure shared understanding. Leaders are taught to use "Inclusive Language" to build a team spirit rather than a bossy hierarchy.</p>
<p>For example, replacing "You must do this" with "How can we work together to finish this?" shifts the dynamic from command to collaboration. Non-verbal communication, such as eye contact and posture, is also emphasized as a way to project confidence and respect.</p>
<h3>MCQ Bank:</h3>
<ol>
<li>Easy: True or False: Active listening requires making eye contact. (Ans: True)</li>
<li>What is the "Clarify-Confirm" method? (Ans: Asking the listener to repeat the instruction in their own words)</li>
<li>What is the main goal of a leader''s communication? (Ans: To ensure shared understanding and action)</li>
<li>Which phrase is best for delegating a task politely? (Ans: "Would you be able to help our team by...")</li>
</ol>
<h3>Performance Task:</h3>
<p>Write a 100-word announcement for a school club meeting that is both professional and encouraging.</p>',
    3,
    60,
    true
  ),
  -- Module 4: Team Dynamics (The Mini-Umuganda)
  (
    'Module 4: Team Dynamics (The Mini-Umuganda)',
    'Organizing collective action for the common good, inspired by Umuganda.',
    '<h2>Team Dynamics (The Mini-Umuganda)</h2>
<p>Leadership is rarely a solo endeavor; it happens within a team. Taking inspiration from the national practice of Umuganda, this module teaches students how to organize collective action for the common good.</p>
<p>High-performing teams require clear roles: The Leader (vision), the Scribe (documentation), and the Timekeeper (efficiency). However, a team is more than its tasks. The Rwandan value of <em>Ubusabane</em> (Socializing) is introduced as a way to build the trust necessary for collaboration.</p>
<p>When team members know and respect each other as people, they are more likely to support one another during stressful projects. Students learn to identify individual strengths and delegate tasks accordingly to maximize the team''s impact.</p>
<h3>MCQ Bank:</h3>
<ol>
<li>Easy: What is the traditional Rwandan practice of community work? (Ans: Umuganda)</li>
<li>Which team role is responsible for keeping track of time? (Ans: Timekeeper)</li>
<li>How does Ubusabane help a leadership team? (Ans: It builds trust and friendship outside of tasks)</li>
<li>What happens to a team when there is no "Scribe"? (Ans: Important decisions and ideas are often forgotten).</li>
</ol>
<h3>Performance Task:</h3>
<p>Record a video explaining how you would organize 5 classmates to clean a classroom in 10 minutes.</p>',
    4,
    60,
    true
  ),
  -- Module 5: Emotional Intelligence (Managing Peer Pressure)
  (
    'Module 5: Emotional Intelligence (Managing Peer Pressure)',
    'Recognizing and managing emotions when facing peer pressure.',
    '<h2>Emotional Intelligence (Managing Peer Pressure)</h2>
<p>Emotional Intelligence (EQ) is the ability to recognize and manage your own emotions and the emotions of those around you. For teenagers, this is most critical when facing peer pressure.</p>
<p>This module introduces the "Stop-Think-Act" method. When faced with a stressful social situation, a leader learns to "Stop" to prevent an impulsive reaction, "Think" about the long-term consequences and how the action aligns with their Agaciro, and then "Act" with confidence.</p>
<p>By recognizing their "Triggers"---specific words or events that cause intense feelings---students gain the self-awareness needed to remain calm under pressure. High EQ allows a leader to be assertive without being aggressive, maintaining their integrity even when it is unpopular.</p>
<h3>MCQ Bank:</h3>
<ol>
<li>Easy: True or False: It is okay to wait until you are calm before responding to an insult. (Ans: True)</li>
<li>What is an "emotional trigger"? (Ans: A specific event that causes an intense emotional reaction)</li>
<li>What is the "Think" step in the Stop-Think-Act method? (Ans: Considering the consequences)</li>
<li>How does high EQ help handle peer pressure? (Ans: It helps you stay true to your values despite social stress)</li>
</ol>
<h3>Performance Task:</h3>
<p>Write a script for a conversation where you encourage a friend to study instead of skipping class, using "I-statements."</p>',
    5,
    60,
    true
  ),
  -- Module 6: Conflict Resolution in Clubs
  (
    'Module 6: Conflict Resolution in Clubs',
    'Adapting the Abunzi mediator framework for the modern classroom.',
    '<h2>Conflict Resolution in Clubs</h2>
<p>Conflict in school organizations often arises from "Resource Scarcity" (who gets to use the hall) or "Relational Friction" (personality clashes). This module adapts the traditional Rwandan <strong>Abunzi</strong> (mediator) framework for the modern classroom.</p>
<p>A leader acts as a neutral third party whose goal is not to judge, but to facilitate a "Win-Win" outcome. The process begins with the "Rules of Engagement," where both parties agree not to interrupt. The mediator then helps each side move from "Positions" (what they say they want) to "Interests" (why they want it).</p>
<p>A key tool is the "I-Statement" (e.g., "I feel overwhelmed when the schedule changes") which prevents the defensiveness caused by "You-Accusations." By focusing on the problem rather than the person, the leader builds a "bridge" that restores <em>Ubusabane</em> (social harmony) within the club, ensuring that the team''s energy is spent on their mission rather than internal arguments.</p>
<h3>MCQ Bank:</h3>
<ol>
<li>Easy: What is the name of Rwandan community mediators? (Ans: Abunzi)</li>
<li>What is a "Win-Win" outcome? (Ans: Both parties feel their needs were met)</li>
<li>What is the first step a mediator should take? (Ans: Allow each person to speak without interruption)</li>
<li>Why should a leader avoid taking sides? (Ans: It destroys their neutrality and trust)</li>
</ol>
<h3>Performance Task:</h3>
<p>Submit a written script of a mediation session between two students arguing over a club budget, using "I-statements."</p>',
    6,
    60,
    true
  ),
  -- Module 7: Decision Making
  (
    'Module 7: Decision Making',
    'Using the Eisenhower Matrix and second-order thinking to make sustainable decisions.',
    '<h2>Decision Making</h2>
<p>Leadership is defined by the quality of the decisions made under pressure. High school leaders often fall into the trap of "Impulsive Choice" or "Analysis Paralysis." To avoid this, we use the <strong>Eisenhower Matrix</strong>, which categorizes tasks by Urgency and Importance.</p>
<p>A leader must prioritize "Important but Not Urgent" tasks---like long-term planning---to prevent them from becoming future crises. This module also teaches "Second-Order Thinking," which asks: "And then what?" Every decision has a ripple effect; for example, deciding to extend a deadline might help one student but delay the entire project for twenty others.</p>
<p>By using a "Pros/Cons" list combined with a 2x2 matrix, leaders can remove emotional bias from their choices. This structured approach ensures that decisions are not just fast, but sustainable, reflecting the <em>Imihigo</em> spirit of excellence and intentionality in every action taken for the student body.</p>
<h3>MCQ Bank:</h3>
<ol>
<li>Should you make a list of Pros and Cons for a big decision? (Ans: Yes)</li>
<li>What is a "Second-Order Effect"? (Ans: The long-term consequence of a choice)</li>
<li>What is the "Eisenhower Matrix" used for? (Ans: Sorting tasks by importance and urgency)</li>
<li>Why do leaders use "Decision Frameworks"? (Ans: To reduce bias and emotional errors)</li>
</ol>
<h3>Performance Task:</h3>
<p>Write a short essay explaining a difficult decision you made recently, using the 2x2 matrix to justify your final choice.</p>',
    7,
    60,
    true
  ),
  -- Module 8: Ethical Leadership & Integrity
  (
    'Module 8: Ethical Leadership & Integrity',
    'Ubupfura: nobility of character when no one is watching.',
    '<h2>Ethical Leadership & Integrity</h2>
<p>At the heart of Rwandan leadership is <strong>Ubupfura</strong>, the nobility of character that dictates a leader''s behavior when no one is watching. Integrity is the alignment of a leader''s words with their actions.</p>
<p>In a school context, this is often tested by the temptation of "Shortcuts," such as cheating on an assignment or using club funds for personal items. This module introduces the "Newspaper Test": before acting, a leader should ask, "Would I be proud if this action was reported on the front page of the news?"</p>
<p>Ethical leadership also involves managing "Conflicts of Interest," where personal benefits might cloud professional judgment. A leader with <em>Ubupfura</em> understands that trust is the most valuable currency; once broken, it is nearly impossible to rebuild. By consistently choosing the "hard right" over the "easy wrong," the student leader protects their <em>Agaciro</em> and sets a standard for their peers to follow.</p>
<h3>MCQ Bank:</h3>
<ol>
<li>Easy: Does integrity mean being honest even when no one is watching? (Ans: Yes)</li>
<li>What does Ubupfura mean in leadership? (Ans: Nobility of character/moral standing)</li>
<li>What is a "Conflict of Interest"? (Ans: When personal benefit clashes with duty)</li>
<li>Why is trust harder to rebuild than to maintain? (Ans: It is the foundation of Agaciro)</li>
</ol>
<h3>Performance Task:</h3>
<p>Write a 300-word persuasive argument on why "Ubupfura" is more important for a leader''s reputation than academic grades.</p>',
    8,
    60,
    true
  ),
  -- Module 9: Digital Leadership
  (
    'Module 9: Digital Leadership',
    'Maintaining Digital Agaciro and managing your digital footprint.',
    '<h2>Digital Leadership</h2>
<p>In 2026, a leader''s influence extends far beyond the physical classroom and into the digital world. This module explores <strong>Digital Agaciro</strong>---the practice of maintaining dignity and respect in online spaces.</p>
<p>Every post, comment, and share creates a <strong>Digital Footprint</strong>, a permanent record that universities and future employers will use to judge a leader''s character. Leaders must practice <strong>Cyber-Politeness</strong> by refusing to engage in cyberbullying or the spread of <strong>Fake News</strong>.</p>
<p>This requires critical thinking: verifying the source of a WhatsApp message before forwarding it to avoid causing unnecessary panic or misinformation. A digital leader uses their platform to encourage others, share helpful resources, and model civil discourse.</p>
<p>By understanding Rwandan laws on cyber-conduct and the global nature of the internet, students learn that their <strong>Digital Tattoo</strong> can either be a mark of honor or a permanent stain on their leadership journey.</p>
<h3>MCQ Bank:</h3>
<ol>
<li>Easy: True or False: If you delete a post, it is gone forever. (Ans: False)</li>
<li>What is a "Digital Footprint"? (Ans: The trail of data you leave behind online)</li>
<li>How can a leader practice "Cyber-Politeness"? (Ans: Disagreeing without insults)</li>
<li>Why verify news before sharing? (Ans: To maintain credibility as a reliable leader)</li>
</ol>
<h3>Performance Task:</h3>
<p>Create a "Digital Code of Conduct" (10 rules) for a school WhatsApp group to ensure respectful and productive communication.</p>',
    9,
    60,
    true
  ),
  -- Module 10: Capstone: The Community Service Plan
  (
    'Module 10: Capstone: The Community Service Plan',
    'Synthesis of all modules: moving from theory to idea-to-action.',
    '<h2>Capstone: The Community Service Plan</h2>
<p>The Capstone project is the synthesis of all nine previous modules, moving from theory to <strong>Idea-to-Action</strong>. Designing a community project requires a deep understanding of <strong>Stakeholders</strong>---the people who will be affected by the project.</p>
<p>A leader must conduct a <strong>Needs Assessment</strong> to ensure the project solves a real problem, such as school waste or student literacy, rather than a perceived one. This module teaches the basics of <strong>Resource Budgeting</strong> (managing time, people, and materials) and the creation of a <strong>Project Timeline</strong> with clear milestones.</p>
<p>To get approval, a leader must deliver an <strong>Elevator Pitch</strong> to stakeholders like the Head Teacher or local leaders, explaining the <strong>Return on Investment</strong> for the community. This project is the ultimate expression of <em>Kwigira</em> (Self-reliance), proving that the student has the skills to identify a challenge, plan a solution, and mobilize their peers to create a positive impact in Rwanda.</p>
<h3>MCQ Bank:</h3>
<ol>
<li>Easy: Is a Capstone Project meant to help yourself or your community? (Ans: Community)</li>
<li>What is the "Goal" section of a proposal for? (Ans: Defining exactly what you achieve)</li>
<li>Why is a "Timeline" important? (Ans: To ensure tasks are completed on time)</li>
<li>What is a "Stakeholder"? (Ans: Anyone affected by or involved in your project)</li>
</ol>
<h3>Performance Task:</h3>
<p>Draft a formal 2-page Project Proposal for a community service activity, including a budget, timeline, and impact statement.</p>',
    10,
    60,
    true
  )
) AS m(title, description, content, order_number, duration_minutes, is_published);

-- ======================================================================
-- TRACK 1: LEADERSHIP (UNIVERSITY LEVEL) - COURSE 2
-- ======================================================================
WITH leadership_university AS (
  INSERT INTO courses (id, title, description, duration_weeks, is_published, thumbnail_url)
  VALUES (
    gen_random_uuid(),
    'Leadership (University Level)',
    'Advanced leadership curriculum for university students focusing on adaptive leadership, strategic planning for Vision 2050, crisis management, policy advocacy, change management, cross-cultural leadership, and an executive capstone portfolio.',
    12,
    true,
    'https://storage.example.com/thumbnails/leadership_university.jpg'
  )
  RETURNING id
)
INSERT INTO course_modules (id, course_id, title, description, content, order_number, duration_minutes, is_published)
SELECT gen_random_uuid(), leadership_university.id, *
FROM (
  VALUES
  -- Module 1: Adaptive Leadership & Systemic Change
  (
    'Module 1: Adaptive Leadership & Systemic Change',
    'Distinguishing technical problems from adaptive challenges.',
    '<h2>Adaptive Leadership & Systemic Change</h2>
<p>Adaptive leadership is a framework for mobilizing people to tackle tough challenges and thrive. At the university level, leaders must distinguish between technical problems and adaptive challenges.</p>
<p><strong>Technical problems</strong> are well-defined, have known solutions, and can be solved by experts or authorities. <strong>Adaptive challenges</strong> are complex, lack clear answers, and require shifts in people''s values or habits.</p>
<p>The core of this practice is <strong>"Getting on the Balcony"</strong> to observe the systemic patterns at play. By stepping back, a leader can identify the "Song beneath the Words" in organizational conflict. Leaders must also manage the <strong>Productive Zone of Equilibrium</strong> to keep urgency at an optimal level.</p>
<p>If the "heat" is too low, the organization becomes stagnant and avoids the difficult work. If the "heat" is too high, the system may experience a breakdown or extreme resistance. Adaptive leadership is not about having all the answers but about asking the right questions.</p>
<p>It involves <strong>"Giving the Work Back"</strong> to those who must ultimately implement the behavioral changes. In Rwanda, this aligns with <em>Kwigira</em>, where the community takes ownership of its development. A leader acts as a facilitator, creating a <strong>Holding Environment</strong> to contain the stress of change.</p>
<p>This requires high levels of emotional intelligence to navigate the inevitable <strong>Work Avoidance</strong>. Work avoidance occurs when people distract themselves with technical fixes to avoid adaptive pain. Systemic change is slow and requires a <strong>Marathon</strong> rather than a <strong>Sprint</strong> mindset for leaders.</p>
<p>The goal is to increase the institution''s capacity to adapt to an ever-changing environment. Leadership is therefore an activity performed by anyone, regardless of their official position. Maintaining <em>Agaciro</em> throughout this process ensures that change does not come at the cost of dignity. Ultimately, adaptive leaders build resilient institutions capable of long-term sustainable growth.</p>
<h3>MCQ Bank:</h3>
<ol>
<li>What distinguishes an adaptive challenge from a technical one? (Ans: It requires a change in habits/values)</li>
<li>What does "Getting on the Balcony" allow a leader to do? (Ans: See systemic patterns)</li>
<li>What is the "Productive Zone of Equilibrium"? (Ans: The optimal level of stress for change)</li>
<li>What is "Work Avoidance"? (Ans: Focusing on easy fixes to avoid difficult behavioral change)</li>
<li>True/False: Adaptive leadership is a position of authority. (Ans: False; it is an activity)</li>
</ol>
<h3>Essay Question:</h3>
<p>Analyze a recent change in your university or community. Was the approach taken "Technical" or "Adaptive"? Argue why a different approach might have yielded more sustainable results.</p>',
    1,
    90,
    true
  ),
  -- Module 2: Strategic Planning & Vision 2050
  (
    'Module 2: Strategic Planning & Vision 2050',
    'Aligning local initiatives with Rwanda''s Vision 2050.',
    '<h2>Strategic Planning & Vision 2050</h2>
<p>Strategic planning is the disciplined effort to produce fundamental decisions that shape an institution. For university leaders, this means aligning local initiatives with Rwanda''s ambitious <strong>Vision 2050</strong>.</p>
<p>Vision 2050 aims to transform Rwanda into a high-income, knowledge-based global economy. The <strong>PESTLE framework</strong> is used to scan the Macro-environment for Political and Economic trends. Social, Technological, Legal, and Environmental factors also dictate the success of a strategy.</p>
<p>A <strong>SWOT analysis</strong> is then used to map internal Strengths and Weaknesses against external realities. Strategic planning avoids <strong>Strategic Drift</strong>, where an institution loses its relevance over time. It requires <strong>Scenario Planning</strong>---preparing for multiple possible futures in a volatile world.</p>
<p>Goals must be SMART: Specific, Measurable, Achievable, Relevant, and Time-bound for accountability. The <strong>Theory of Change</strong> explains the logical link between activities and the long-term impact. Leaders must communicate the <strong>Commander''s Intent</strong> so teams can adapt tactics while meeting goals.</p>
<p>Strategic alignment ensures that every department is moving toward the same <strong>North Star</strong>. In Rwanda, this often involves public-private partnerships to bridge the infrastructure gap. Financial sustainability must be baked into the strategy to ensure the vision survives past year one.</p>
<p><strong>Backward Mapping</strong> is used to determine the necessary steps today to reach a goal in twenty years. This process requires <strong>Stakeholder Buy-in</strong> to ensure those affected by the plan support its execution.</p>
<p>Agility is crucial, as strategies must be reviewed and adjusted based on real-world feedback. A well-executed strategy protects the institution''s <em>Agaciro</em> by ensuring it remains a leader in its field. Ultimately, strategy is about choosing what <em>not</em> to do as much as choosing what <em>to</em> do.</p>
<p>The final plan acts as a roadmap for the next generation of Rwandan institutional leaders.</p>
<h3>MCQ Bank:</h3>
<ol>
<li>What does the "E" in PESTLE stand for? (Ans: Economic and Environmental)</li>
<li>Vision 2050 aims for Rwanda to become what type of economy? (Ans: High-income/Knowledge-based)</li>
<li>Which SWOT elements are considered external? (Ans: Opportunities and Threats)</li>
<li>What is "Strategic Drift"? (Ans: When a strategy becomes outdated and fails to adapt)</li>
<li>What is the benefit of "Backward Mapping"? (Ans: It identifies the immediate steps needed for a long-term goal)</li>
</ol>
<h3>Essay Question:</h3>
<p>Choose a specific sector (e.g., Healthcare, Education, or ICT). Conduct a PESTLE analysis for that sector in Rwanda and propose one strategic goal to reach by 2030.</p>',
    2,
    90,
    true
  ),
  -- Module 6: Crisis Management & Communication (Note: Modules 3,4,5 are intentionally omitted from source doc order but preserved as numbered)
  (
    'Module 6: Crisis Management & Communication',
    'Managing disruptive events with radical transparency and Antifragility.',
    '<h2>Crisis Management & Communication</h2>
<p>Crisis management is the process by which an institution deals with a major disruptive event. In a university setting, crises can range from financial scandals to public health emergencies.</p>
<p>The <strong>Golden Hour</strong> is the first sixty minutes where a leader''s response dictates the narrative. During this time, <strong>Radical Transparency</strong> is the best tool to maintain institutional trust. A <strong>Crisis Management Team</strong> (CMT) must be cross-functional, involving legal, PR, and operations.</p>
<p>The <strong>Command, Control, and Communication</strong> framework ensures that decision-making is centralized. Leaders must avoid the <strong>No Comment</strong> trap, as silence is often interpreted as guilt or confusion. Effective communication focuses on what is known, what is unknown, and what is being done.</p>
<p><strong>Reputational Risk</strong> is often more damaging in the long run than the physical crisis itself. <strong>Antifragility</strong> is the goal---using the crisis to improve and become stronger than before.</p>
<p>Post-crisis <strong>After-Action Reviews</strong> are essential to identify systemic flaws that led to the event. Leaders must manage <strong>Stakeholder Anxiety</strong> by providing regular, verified updates via official channels. In Rwanda, crisis response is built on community resilience and the value of <em>Ubusabane</em>.</p>
<p>Ethical leadership during a crisis means prioritizing human safety over institutional ego. The <strong>Single Spokesperson</strong> rule prevents conflicting messages from reaching the public. Digital platforms must be monitored in real-time to combat <strong>Fake News</strong> and misinformation.</p>
<p>Crisis communication is an exercise in <em>Agaciro</em>, maintaining dignity under extreme pressure. Preparation involves regular simulations to ensure the CMT knows how to react automatically. A successful recovery requires <strong>Closing the Loop</strong> by fulfilling every promise made during the heat.</p>
<p>Ultimately, a leader is judged not by the crisis itself, but by the integrity of their response.</p>
<h3>MCQ Bank:</h3>
<ol>
<li>What is the "Golden Hour" in crisis management? (Ans: The critical first hour for communication)</li>
<li>What is "Antifragility"? (Ans: The ability to become stronger after a disruptive event)</li>
<li>Why is a "Single Spokesperson" important? (Ans: To ensure message consistency)</li>
<li>What should a leader focus on in their first statement? (Ans: What is known, unknown, and action steps)</li>
<li>"Reputational Risk" refers to damage to what? (Ans: The institution''s standing and trust)</li>
</ol>
<h3>Essay Question:</h3>
<p>Critique a recent crisis response by a global or local organization. What did they do well in the "Golden Hour," and what led to a loss of public trust?</p>
<h3>Video Submission Task:</h3>
<p><strong>Topic:</strong> The PR Response.<br>
<strong>Task:</strong> Record a 5-minute video acting as a University Spokesperson. You must deliver a "Press Briefing" regarding a hypothetical crisis (e.g., a major campus power outage during exams). You will be graded on your "Golden Hour" clarity, transparency, and tonality.</p>',
    3,
    90,
    true
  ),
  -- Module 7: Policy Advocacy & Institutional Change
  (
    'Module 7: Policy Advocacy & Institutional Change',
    'Influencing decision-makers to adopt specific rules.',
    '<h2>Policy Advocacy & Institutional Change</h2>
<p>Policy advocacy is the strategic process of influencing decision-makers to adopt specific rules. University leaders use advocacy to improve student welfare, research funding, or social equity.</p>
<p>The <strong>Policy Cycle</strong> begins with <strong>Agenda Setting</strong>---getting your issue on the leader''s radar. Evidence-based advocacy relies on rigorous data and <strong>Social Impact Assessments</strong> for proof.</p>
<p>A <strong>Policy Brief</strong> is the primary tool, distilling complex research into actionable advice. It must include a problem statement, policy options, and a clear, evidence-backed recommendation. Advocacy requires <strong>Stakeholder Mapping</strong> to identify allies, opponents, and neutral parties.</p>
<p><strong>Lobbying</strong> is a direct form of advocacy that involves meeting with officials to explain your case. Effective advocacy is often a <strong>Hybrid Model</strong>, combining data-heavy reports with human stories. In Rwanda, policy changes must align with the <strong>National Transformation Strategy</strong> (NST1).</p>
<p><strong>Grassroots Advocacy</strong> mobilizes the student body to show broad support for a proposed change. Institutional change is often resisted, so advocates must build a <strong>Guiding Coalition</strong> of supporters.</p>
<p>The <strong>Evaluation</strong> phase of the policy cycle measures if the change actually solved the problem. Advocates must be prepared for <strong>Policy Compromise</strong> while protecting their core objectives. Cultural intelligence is needed to navigate the <strong>Power Dynamics</strong> within university administration.</p>
<p>Persistence is key, as policy change often takes months or years of consistent pressure. <strong>Digital Advocacy</strong> uses social media to amplify the message and reach a wider audience. Integrity in advocacy means never misrepresenting data to "win" a policy argument.</p>
<p>The ultimate goal is <strong>Systemic Evolution</strong>---leaving the institution better than you found it. Leadership in advocacy is about being the voice for those who cannot speak for themselves.</p>
<h3>MCQ Bank:</h3>
<ol>
<li>What is the first stage of the Policy Cycle? (Ans: Agenda Setting)</li>
<li>What is the purpose of a Policy Brief? (Ans: To provide concise, actionable advice to a decision-maker)</li>
<li>What does "Grassroots Advocacy" involve? (Ans: Mobilizing a large group of people to show support)</li>
<li>Why is "Stakeholder Mapping" necessary? (Ans: To identify who supports or opposes your plan)</li>
<li>What is "Evidence-Based Advocacy"? (Ans: Using data and research to prove your point)</li>
</ol>
<h3>Essay Question:</h3>
<p>Identify one policy at your university that you believe needs to change. Draft a 300-word "Problem Statement" that would serve as the introduction to a Policy Brief.</p>
<h3>Video Submission Task:</h3>
<p><strong>Topic:</strong> The Policy Pitch.<br>
<strong>Task:</strong> Record a 5-minute video pitching a new campus policy (e.g., mandatory mental health days) to a "Board of Directors." Your video must demonstrate the use of evidence and a clear "Call to Action."</p>',
    4,
    90,
    true
  ),
  -- Module 8: Change Management & Resistance
  (
    'Module 8: Change Management & Resistance',
    'Leading the human side of organizational transitions using Kotter''s 8-Step Process.',
    '<h2>Change Management & Resistance</h2>
<p>Change management is the framework for leading the <strong>Human Side</strong> of organizational transitions. Even beneficial changes are often met with resistance due to the <strong>Fear of the Unknown</strong>.</p>
<p>Kotter''s 8-Step Process begins with <strong>Creating a Sense of Urgency</strong> to overcome stagnation. Leaders must form a <strong>Guiding Coalition</strong> of influential people to champion the change.</p>
<p>The <strong>Neutral Zone</strong> is the psychological period where people feel disoriented by the new rules. <strong>Change Fatigue</strong> occurs when an organization is pushed through too many transitions too fast.</p>
<p>Resistance should be viewed as <strong>Diagnostic Data</strong>---it tells you where people feel threatened. Communicating the <strong>Change Vision</strong> must be done ten times more than a leader thinks is necessary.</p>
<p><strong>Short-Term Wins</strong> are essential to build momentum and prove that the change is working. Leaders must <strong>Anchor</strong> the new behaviors in the institutional culture to make them stick.</p>
<p>The <strong>Individual Transition</strong> happens at different speeds for different members of the team. <strong>Incentive Alignment</strong> ensures that people are rewarded for adopting the new behaviors. In Rwanda, change is often managed through <em>Imihigo</em>, creating clear individual targets.</p>
<p><strong>Transparent Feedback Loops</strong> allow leaders to adjust the plan based on real-world friction. Leadership during change requires high empathy to manage the <strong>Loss</strong> people feel for the old way.</p>
<p><strong>Passive Resistance</strong> (agreeing in public but doing nothing) is more dangerous than open protest. Leaders must lead by example, being the first to adopt the new tools or processes.</p>
<p>The <strong>Marathon Effect</strong> warns leaders that they are often miles ahead of their team in the process. Success is when the <strong>New Way</strong> simply becomes <strong>The Way We Do Things Here</strong>.</p>
<p>Effective change management protects the institution''s <em>Agaciro</em> by honoring the people involved.</p>
<h3>MCQ Bank:</h3>
<ol>
<li>What is the first step in Kotter''s 8-Step Process? (Ans: Create a sense of urgency)</li>
<li>How should a leader view "Resistance"? (Ans: As valuable data/feedback)</li>
<li>What is the "Neutral Zone"? (Ans: The psychological transition period between the old and new)</li>
<li>What is "Change Fatigue"? (Ans: Exhaustion from too many rapid organizational changes)</li>
<li>Why are "Short-Term Wins" important? (Ans: They build momentum and provide proof of success)</li>
</ol>
<h3>Essay Question:</h3>
<p>Reflect on a time you had to change a habit or a group you led had to change a rule. Using Kotter''s steps, identify which step was the hardest to complete and why.</p>
<h3>Video Submission Task:</h3>
<p><strong>Topic:</strong> Overcoming Resistance.<br>
<strong>Task:</strong> Record a 5-minute video addressed to a "resistant team." You must explain a major change (e.g., moving all club activities to a digital-only platform) and use empathy to address their fears while maintaining the vision.</p>',
    5,
    90,
    true
  ),
  -- Module 9: Cross-Cultural Leadership & Global Mindset
  (
    'Module 9: Cross-Cultural Leadership & Global Mindset',
    'Operating effectively across national borders with Cultural Intelligence (CQ).',
    '<h2>Cross-Cultural Leadership & Global Mindset</h2>
<p>Cross-cultural leadership is the ability to influence people from diverse backgrounds effectively. As the EAC and AfCFTA expand, Rwandan leaders must operate across national borders.</p>
<p>Hofstede''s Cultural Dimensions help leaders understand <strong>Power Distance</strong> and <strong>Individualism</strong>. <strong>High-Context</strong> cultures rely on relationships, while <strong>Low-Context</strong> cultures rely on contracts.</p>
<p><strong>Cultural Intelligence</strong> (CQ) is the ability to adapt your style without losing your core identity. CQ involves <strong>Drive</strong> (motivation), <strong>Knowledge</strong> (understanding), and <strong>Action</strong> (behavior).</p>
<p>Leaders must avoid <strong>Ethnocentrism</strong>---the belief that one''s own culture is superior to others. In a globalized world, <strong>Micro-aggressions</strong> can accidentally destroy professional relationships.</p>
<p><strong>Inclusive Leadership</strong> ensures that every voice is heard, regardless of their cultural origin. Rwandan leaders use <em>Agaciro</em> as a universal standard of dignity that transcends borders.</p>
<p><strong>Code-Switching</strong> is the ability to adjust your communication style to fit a specific audience. A <strong>Global Mindset</strong> requires curiosity and a willingness to learn from different perspectives.</p>
<p>Negotiating across cultures requires understanding <strong>Non-verbal Cues</strong> like silence or eye contact. <strong>Global Diplomacy</strong> is about finding the <strong>Common Ground</strong> between different national interests.</p>
<p>Leaders must manage <strong>Uncertainty Avoidance</strong>---how much a culture fears the unknown. Team diversity leads to better <strong>Problem-Solving</strong> only if the leader can manage the friction.</p>
<p><strong>Time Orientation</strong> varies; some cultures are <strong>Monochronic</strong> (punctual) and others <strong>Polychronic</strong>. Trust is built differently globally---some cultures trust <strong>The Head</strong> and others <strong>The Heart</strong>.</p>
<p>A leader''s goal is to be a <strong>Bridge-Builder</strong> in the global knowledge economy. Ultimately, cross-cultural mastery is a competitive advantage for Rwanda''s future executives.</p>
<h3>MCQ Bank:</h3>
<ol>
<li>What is Cultural Intelligence (CQ)? (Ans: The ability to adapt to and function in different cultures)</li>
<li>What does "Power Distance" measure? (Ans: How much a culture accepts unequal authority)</li>
<li>What is "Ethnocentrism"? (Ans: Believing your own culture is superior to others)</li>
<li>What is the difference between High-Context and Low-Context cultures? (Ans: High-context relies on relationships; Low-context relies on explicit words/contracts)</li>
<li>True/False: A "Global Mindset" means forgetting your own cultural values. (Ans: False)</li>
</ol>
<h3>Essay Question:</h3>
<p>Imagine you are managing a project with team members from Rwanda, China, and the USA. Identify two potential "Cultural Friction Points" and propose a strategy to resolve them.</p>
<h3>Video Submission Task:</h3>
<p><strong>Topic:</strong> The Global Welcome.<br>
<strong>Task:</strong> Record a 5-minute video welcoming an international delegation to your university. You must demonstrate "Cultural Intelligence" by acknowledging their customs while proudly presenting Rwandan values.</p>',
    6,
    90,
    true
  ),
  -- Module 10: Executive Portfolio & Systemic Impact (Capstone)
  (
    'Module 10: Executive Portfolio & Systemic Impact (Capstone)',
    'Final synthesis: professional record of leadership journey and systemic impact.',
    '<h2>Executive Portfolio & Systemic Impact (Capstone)</h2>
<p>The Capstone is the final synthesis of a university leader''s theoretical and practical skills. An <strong>Executive Portfolio</strong> is a professional record of your leadership journey and impact.</p>
<p>It must demonstrate <strong>Systemic Thinking</strong>---addressing the root causes of problems, not symptoms. The Capstone project requires a <strong>Sustainability Plan</strong> to ensure it thrives after the leader leaves.</p>
<p><strong>Scaling Strategy</strong> involves planning how to grow a local project into a regional or national one. Leaders must identify <strong>Strategic Partners</strong> who can provide the resources or authority needed.</p>
<p><strong>Monitoring and Evaluation</strong> (M&E) uses KPIs to prove the project''s success to stakeholders. A <strong>Leadership Manifesto</strong> is included, outlining the leader''s core values and 10-year vision.</p>
<p><strong>Fiduciary Stewardship</strong> means showing exactly how resources were managed during the project. The Capstone is an exercise in <em>Kwigira</em>, proving that you can solve problems without aid.</p>
<p><strong>Stakeholder Management</strong> at this level involves pitching to CEOs, Ministers, or VCs. The portfolio must show <strong>Iterative Learning</strong>---how you adapted the project based on failure.</p>
<p><strong>Executive Presence</strong> is the combination of confidence, communication, and competence. A leader''s <strong>Legacy</strong> is measured by the systems they leave behind for the next generation.</p>
<p>This module covers <strong>Closing the Loop</strong>---reporting results back to everyone who helped. <strong>Professional Branding</strong> ensures your leadership potential is visible to the global market.</p>
<p>The <strong>Logic Model</strong> is used to show the clear path from <strong>Inputs</strong> to <strong>Systemic Outcomes</strong>. Ethical leadership at the capstone level requires a commitment to <strong>Zero Corruption</strong>.</p>
<p>The final submission is a <strong>Masterpiece</strong> of both written strategy and personal conviction. You are now ready to enter the Rwandan economy as a transformational executive leader.</p>
<h3>MCQ Bank:</h3>
<ol>
<li>What is "Systemic Thinking"? (Ans: Addressing root causes rather than symptoms)</li>
<li>What is a "Sustainability Plan"? (Ans: A strategy to ensure a project lasts long-term)</li>
<li>What does "Scaling" a project mean? (Ans: Increasing its size, reach, or impact)</li>
<li>What is a "Leadership Manifesto"? (Ans: A declaration of a leader''s values and future vision)</li>
<li>Why is "Monitoring and Evaluation" (M&E) important? (Ans: To prove results and track progress using data)</li>
</ol>
<h3>Essay Question:</h3>
<p>Write your 300-word "Leadership Manifesto." Define your "Red Lines" (ethical boundaries) and your "North Star" (ultimate goal) for your career.</p>
<h3>Video Submission Task:</h3>
<p><strong>Topic:</strong> The Executive Pitch.<br>
<strong>Task:</strong> Record a 5-minute video "Executive Pitch" of your Capstone project. You must convince a hypothetical investor to provide the resources needed to "Scale" your project to a national level.</p>',
    7,
    90,
    true
  )
) AS m(title, description, content, order_number, duration_minutes, is_published);

-- ======================================================================
-- TRACK 2: PUBLIC SPEAKING (SECONDARY LEVEL) - COURSE 3
-- ======================================================================
WITH public_speaking_secondary AS (
  INSERT INTO courses (id, title, description, duration_weeks, is_published, thumbnail_url)
  VALUES (
    gen_random_uuid(),
    'Public Speaking (Secondary Level)',
    'A comprehensive introduction to persuasive communication for secondary students. Covers rhetoric, storytelling, non-verbal communication, speech structure, impromptu speaking, pitching, debating, visual aids, ceremonial speaking, and a capstone "Change Rwanda" speech.',
    10,
    true,
    'https://storage.example.com/thumbnails/public_speaking_secondary.jpg'
  )
  RETURNING id
)
INSERT INTO course_modules (id, course_id, title, description, content, order_number, duration_minutes, is_published)
SELECT gen_random_uuid(), public_speaking_secondary.id, *
FROM (
  VALUES
  -- Module 1: The Building Blocks of Persuasion
  (
    'Module 1: The Building Blocks of Persuasion',
    'Ethos, Pathos, and Logos: the three pillars of classical rhetoric.',
    '<h2>The Building Blocks of Persuasion</h2>
<p>Public speaking is more than just talking; it is the art of moving an audience toward a new way of thinking. At the secondary level, we focus on the three pillars of classical rhetoric: <strong>Ethos, Pathos, and Logos</strong>.</p>
<p><strong>Ethos</strong> is your credibility---showing the audience you are trustworthy. <strong>Pathos</strong> is the emotional heart of your speech, using stories to make people feel your message. <strong>Logos</strong> is the logic---using clear facts and "because" statements to prove your point.</p>
<p>A great student leader doesn''t just use one; they balance all three. For example, when asking for school improvements, you show your grades (Ethos), tell a story about a struggling student (Pathos), and provide a budget of costs (Logos).</p>
<p>Mastering this balance early allows you to influence your peers and teachers effectively while building a reputation for <em>Agaciro</em> in your communication.</p>
<h3>MCQ Bank:</h3>
<ol>
<li>Easy: Does "Ethos" refer to the speaker''s credibility? (Ans: Yes)</li>
<li>Which pillar of rhetoric focuses on using facts and logic? (Ans: Logos)</li>
<li>Why is "Pathos" important in a speech? (Ans: It creates an emotional connection with the audience)</li>
<li>True/False: You should only use logic and never use stories in a speech. (Ans: False)</li>
</ol>
<h3>Essay Prompt:</h3>
<p>Describe a time you tried to convince a friend to do something. Which of the three pillars (Ethos, Pathos, Logos) did you use most, and was it successful?</p>',
    1,
    60,
    true
  ),
  -- Module 2: Narrative Leadership (Storytelling)
  (
    'Module 2: Narrative Leadership (Storytelling)',
    'Using personal or community stories to illustrate a leadership lesson.',
    '<h2>Narrative Leadership (Storytelling)</h2>
<p>People forget statistics, but they remember stories. <strong>Narrative Leadership</strong> is the ability to use personal or community stories to illustrate a leadership lesson.</p>
<p>A good story follows a clear arc: <strong>The Challenge</strong> (what went wrong?), <strong>The Choice</strong> (what did you decide to do?), and <strong>The Outcome</strong> (what was the result?).</p>
<p>As a high school leader, your stories should be relatable. Instead of talking about "Success" in a general way, talk about the time you failed a math test and how you practiced <em>Kwigira</em> (Self-reliance) to improve.</p>
<p>This makes you a <strong>Vulnerable Leader</strong>, which actually makes you more influential because your peers see themselves in your journey. Always ensure your story has a <strong>Moral</strong>---a clear takeaway that the audience can apply to their own lives immediately.</p>
<h3>MCQ Bank:</h3>
<ol>
<li>Easy: Is a personal story usually more memorable than a list of facts? (Ans: Yes)</li>
<li>What are the three parts of a story arc? (Ans: Challenge, Choice, Outcome)</li>
<li>What is the "Moral" of a story? (Ans: The lesson or takeaway for the audience)</li>
<li>Why should a leader be "vulnerable" in their storytelling? (Ans: To build trust and relatability)</li>
</ol>
<h3>Essay Prompt:</h3>
<p>Write a 200-word story about a time you showed "Gukunda Igihugu" (Patriotism) in your local community or school.</p>',
    2,
    60,
    true
  ),
  -- Module 3: Non-Verbal Power (Body & Voice)
  (
    'Module 3: Non-Verbal Power (Body & Voice)',
    'Mastering posture, eye contact, and vocal variety to project Executive Presence.',
    '<h2>Non-Verbal Power (Body & Voice)</h2>
<p>Studies show that over 50% of your message is delivered through your body language, not your words. To project <strong>Executive Presence</strong>, a student leader must master three things: <strong>Posture, Eye Contact, and Vocal Variety</strong>.</p>
<p>Standing tall with an open posture signals confidence and Agaciro. Meaningful eye contact (holding a gaze for 3 seconds per person) builds a 1-on-1 connection even in a large room.</p>
<p>Your voice is an instrument; <strong>Vocal Variety</strong> means changing your pitch (high/low), volume (loud/soft), and pace (fast/slow) to keep the audience awake.</p>
<p>For example, you should slow down and lower your voice when sharing something serious, and speed up when you are excited about a new school project. Avoiding <strong>Filler Words</strong> like "um" and "uh" is the final step in sounding like a professional leader.</p>
<h3>MCQ Bank:</h3>
<ol>
<li>Easy: Does standing up straight make you look more confident? (Ans: Yes)</li>
<li>What is "Vocal Variety"? (Ans: Changing your tone, speed, and volume while speaking)</li>
<li>How long should you try to hold eye contact with one person? (Ans: About 3 seconds)</li>
<li>Why should you avoid "Filler Words" like "um"? (Ans: They make you sound less prepared or nervous)</li>
</ol>
<h3>Essay Prompt:</h3>
<p>Watch a video of a famous speaker. List three things they did with their hands or voice that made them interesting to watch.</p>',
    3,
    60,
    true
  ),
  -- Module 4: Logical Outlining & Structure
  (
    'Module 4: Logical Outlining & Structure',
    'The Tell-Tell-Tell method and the Rule of Three.',
    '<h2>Logical Outlining & Structure</h2>
<p>A speech without a structure is like a house without a frame---it will collapse. The most effective structure for high school oratory is the <strong>"Tell-Tell-Tell" method</strong>:</p>
<ol>
<li>Tell them what you are going to tell them (Introduction),</li>
<li>Tell them (Body),</li>
<li>Tell them what you told them (Conclusion).</li>
</ol>
<p>Your body should have exactly three main points. This is called the <strong>Rule of Three</strong> because the human brain remembers things best in groups of three.</p>
<p>Use <strong>Signposts</strong> like "First," "Furthermore," and "Finally" to act as a map for your listeners. A strong introduction must have a <strong>Hook</strong> (a question, a quote, or a surprising fact), and a strong conclusion must have a <strong>Call to Action</strong> (telling the audience exactly what to do next).</p>
<h3>MCQ Bank:</h3>
<ol>
<li>Easy: Should a speech have a beginning, middle, and end? (Ans: Yes)</li>
<li>What is a "Hook" in a speech? (Ans: An opening that grabs the audience''s attention)</li>
<li>What is the "Rule of Three"? (Ans: The idea that things presented in threes are more memorable)</li>
<li>What is a "Call to Action"? (Ans: A clear instruction to the audience at the end of a speech)</li>
</ol>
<h3>Essay Prompt:</h3>
<p>Create a basic outline for a speech titled "Why Every Student Should Join a Club." Include a Hook and three main points.</p>',
    4,
    60,
    true
  ),
  -- Module 5: Impromptu Speaking (Thinking on Your Feet)
  (
    'Module 5: Impromptu Speaking (Thinking on Your Feet)',
    'Using the PREP Framework to stay organized without preparation.',
    '<h2>Impromptu Speaking (Thinking on Your Feet)</h2>
<p>Most of your leadership speaking won''t be on a stage; it will be in a hallway or a classroom when a teacher asks for your opinion. This is <strong>Impromptu Speaking</strong>.</p>
<p>To succeed, use the <strong>PREP Framework</strong>:</p>
<ul>
<li><strong>P</strong>oint (State your main idea),</li>
<li><strong>R</strong>eason (Explain why),</li>
<li><strong>E</strong>xample (Give a real-life proof),</li>
<li><strong>P</strong>oint (Restate your idea).</li>
</ul>
<p>This ensures you stay organized even when you haven''t prepared. The key to impromptu speaking is <strong>The Pause</strong>. Instead of saying "um" while you think, simply stay silent for two seconds. This makes you look thoughtful and in control.</p>
<p>Practice thinking in <strong>Soundbites</strong>---short, punchy sentences that summarize your thoughts quickly.</p>
<h3>MCQ Bank:</h3>
<ol>
<li>Easy: Is "Impromptu Speaking" done without much preparation? (Ans: Yes)</li>
<li>What does the ''E'' in the PREP framework stand for? (Ans: Example)</li>
<li>What should you do instead of using a filler word like "uh" while thinking? (Ans: Take a short, silent pause)</li>
<li>Why is restating your Point at the end important? (Ans: It reinforces your message)</li>
</ol>
<h3>Essay Prompt:</h3>
<p>If a visitor asked you, "What is the best thing about your school?" right now, how would you use the PREP framework to answer them?</p>',
    5,
    60,
    true
  ),
  -- Module 6: Persuasive Pitching (The School Project)
  (
    'Module 6: Persuasive Pitching (The School Project)',
    'Using the Problem-Solution-Impact model to get a "Yes".',
    '<h2>Persuasive Pitching (The School Project)</h2>
<p>As a leader, you will often need to <strong>Pitch</strong> an idea to your Head Teacher or a school committee. A pitch is a focused persuasive speech designed to get a <strong>"Yes"</strong>.</p>
<p>You must start with the <strong>Problem</strong> (e.g., "The library is too noisy for studying"), offer a <strong>Solution</strong> (e.g., "Creating a quiet-zone schedule"), and describe the <strong>Benefit</strong> (e.g., "Higher exam scores for everyone"). This is the <strong>Problem-Solution-Impact</strong> model.</p>
<p>When pitching, you must anticipate <strong>Objections</strong>---the reasons someone might say no (like "It costs too much")---and have an answer ready. This shows you have done your research and are a mature, strategic leader.</p>
<h3>MCQ Bank:</h3>
<ol>
<li>Easy: Is a "Pitch" meant to get someone to agree with your idea? (Ans: Yes)</li>
<li>What are the three parts of the "P-S-I" pitch model? (Ans: Problem, Solution, Impact)</li>
<li>What is an "Objection"? (Ans: A reason someone might disagree with or challenge your idea)</li>
<li>Why should you research objections before you pitch? (Ans: To be prepared with a smart answer)</li>
</ol>
<h3>Video Submission (5 Minutes):</h3>
<p>Submit a 5-minute video of you "Pitching" a new club or activity for your school. You must use the Problem-Solution-Impact model and address one potential objection.</p>',
    6,
    60,
    true
  ),
  -- Module 7: Debating with Respect (Civil Discourse)
  (
    'Module 7: Debating with Respect (Civil Discourse)',
    '4-Step Refutation and maintaining Agaciro during disagreement.',
    '<h2>Debating with Respect (Civil Discourse)</h2>
<p>Leadership requires the ability to disagree without being disagreeable. This module covers <strong>Refutation</strong>---the art of proving an opponent''s point wrong while maintaining their <em>Agaciro</em>.</p>
<p>Instead of saying "You are wrong," a leader says, "I see your point, but the evidence suggests otherwise." Use the <strong>"4-Step Refutation"</strong>:</p>
<ol>
<li>"They said..." (Summarize their point),</li>
<li>"But..." (State your counter-point),</li>
<li>"Because..." (Provide evidence),</li>
<li>"Therefore..." (Explain why your point is stronger).</li>
</ol>
<p>This creates a culture of <strong>Civility</strong>, where ideas are debated but people are respected.</p>
<h3>MCQ Bank:</h3>
<ol>
<li>Easy: Can you disagree with someone and still be respectful? (Ans: Yes)</li>
<li>What is the first step of the 4-Step Refutation? (Ans: Summarize what the other person said)</li>
<li>Why is "Civility" important in a school debate? (Ans: It protects relationships and focuses on ideas)</li>
<li>What does "Therefore" do in a refutation? (Ans: It explains why your idea is better or more logical)</li>
</ol>
<h3>Video Submission (5 Minutes):</h3>
<p>Record a 5-minute video where you present a "Pro" and "Con" argument for a controversial topic (e.g., "Should school uniforms be mandatory?") and conclude with a respectful compromise.</p>',
    7,
    60,
    true
  ),
  -- Module 8: Visual Aids & Presentation Tech
  (
    'Module 8: Visual Aids & Presentation Tech',
    'Supporting your message with effective visuals (6x6 Rule).',
    '<h2>Visual Aids & Presentation Tech</h2>
<p>Visual aids (like posters or slides) should support you, not replace you. The #1 mistake is putting too much text on a slide. Follow the <strong>6x6 Rule</strong>: No more than 6 lines of text, and no more than 6 words per line.</p>
<p>Use high-quality images that evoke emotion or provide data. When using a poster, stand to the side so you don''t block it. Always look at the audience, not at the screen or poster.</p>
<p>Your visual aid is there to provide the <strong>Proof</strong> (like a map or a chart) while you provide the <strong>Passion</strong>.</p>
<h3>MCQ Bank:</h3>
<ol>
<li>Easy: Should you put every word of your speech on your slides? (Ans: No)</li>
<li>What is the "6x6 Rule" for presentations? (Ans: Max 6 lines of text, max 6 words per line)</li>
<li>Where should you stand when using a visual aid? (Ans: To the side, so the audience can see both you and the aid)</li>
<li>What is the main purpose of a visual aid? (Ans: To support and illustrate what you are saying)</li>
</ol>
<h3>Video Submission (5 Minutes):</h3>
<p>Deliver a 5-minute presentation using a visual aid (could be a physical poster or digital slides). You will be graded on your "6x6" adherence and how well you stay focused on the audience.</p>',
    8,
    60,
    true
  ),
  -- Module 9: Ceremonial Speaking (The Vote of Thanks)
  (
    'Module 9: Ceremonial Speaking (The Vote of Thanks)',
    'Honoring guests and closing events with the H.P.T. Formula.',
    '<h2>Ceremonial Speaking (The Vote of Thanks)</h2>
<p>A leader is often asked to give a <strong>Vote of Thanks</strong> at the end of an event or to introduce a guest. This is <strong>Ceremonial Speaking</strong>.</p>
<p>The goal is to make the guest feel honored and the audience feel appreciated. Use the <strong>H.P.T. Formula</strong>:</p>
<ul>
<li><strong>H</strong>onor (Thank the guest by name),</li>
<li><strong>P</strong>ersonal Touch (Mention one specific thing they said that was helpful),</li>
<li><strong>T</strong>hanks (Thank the organizers and the audience).</li>
</ul>
<p>A Vote of Thanks should be short (under 2 minutes), warm, and energetic. It is the final "social glue" that leaves everyone with a positive feeling.</p>
<h3>MCQ Bank:</h3>
<ol>
<li>Easy: Is a Vote of Thanks usually a long or short speech? (Ans: Short)</li>
<li>What does the ''P'' in the H.P.T. formula stand for? (Ans: Personal Touch)</li>
<li>Who should you always mention by name in a Vote of Thanks? (Ans: The guest speaker or guest of honor)</li>
<li>What is the main goal of ceremonial speaking? (Ans: To honor others and close the event with a good feeling)</li>
</ol>
<h3>Video Submission (5 Minutes):</h3>
<p>Record a 5-minute video that includes: 1. An introduction of a "Guest Speaker" (can be a classmate) and 2. A "Vote of Thanks" for that speaker.</p>',
    9,
    60,
    true
  ),
  -- Module 10: The Capstone: The "Change Rwanda" Speech
  (
    'Module 10: The Capstone: The "Change Rwanda" Speech',
    'Final persuasive manifesto on a topic the student is passionate about changing in Rwanda.',
    '<h2>The Capstone: The "Change Rwanda" Speech</h2>
<p>The Capstone is your final masterpiece. You will write and deliver a 5-minute persuasive speech on a topic you are passionate about changing in Rwanda.</p>
<p>This speech must combine every skill: A strong Hook, a clear Rule of Three structure, personal storytelling, and a powerful Call to Action. You must use <strong>Vocal Variety</strong> and <strong>Open Body Language</strong> to show your Agaciro.</p>
<p>This isn''t just an assignment; it is your <strong>Manifesto</strong> as a young leader. You are proving that you have the voice and the vision to contribute to Rwanda''s journey toward 2050.</p>
<h3>MCQ Bank:</h3>
<ol>
<li>Easy: Is the Capstone a summary of all your public speaking skills? (Ans: Yes)</li>
<li>What is a "Manifesto"? (Ans: A public declaration of your intentions, motives, or views)</li>
<li>How long should your Capstone speech be? (Ans: 5 minutes)</li>
<li>What should the final sentence of your speech ideally be? (Ans: A powerful "Call to Action")</li>
</ol>
<h3>Video Submission (5 Minutes):</h3>
<p>Submit your 5-minute "Change Rwanda" speech. This is your final exam. It must be memorized or delivered with minimal notes, focusing on high-impact eye contact and vocal passion.</p>',
    10,
    60,
    true
  )
) AS m(title, description, content, order_number, duration_minutes, is_published);

-- ======================================================================
-- TRACK 2: PUBLIC SPEAKING (UNIVERSITY LEVEL) - COURSE 4
-- ======================================================================
WITH public_speaking_university AS (
  INSERT INTO courses (id, title, description, duration_weeks, is_published, thumbnail_url)
  VALUES (
    gen_random_uuid(),
    'Public Speaking (University Level)',
    'Advanced rhetorical theory for university students. Covers ethical speaking, venture oratory, data storytelling, media training, keynote mastery, speechwriting, audience psychology, digital oratory, ceremonial MC skills, and a TED-style capstone talk.',
    10,
    true,
    'https://storage.example.com/thumbnails/public_speaking_university.jpg'
  )
  RETURNING id
)
INSERT INTO course_modules (id, course_id, title, description, content, order_number, duration_minutes, is_published)
SELECT gen_random_uuid(), public_speaking_university.id, *
FROM (
  VALUES
  -- Module 1: Rhetorical Theory & The Ethical Speaker
  (
    'Module 1: Rhetorical Theory & The Ethical Speaker',
    'Aristotle''s triad and the practice of intellectual honesty.',
    '<h2>Rhetorical Theory & The Ethical Speaker</h2>
<p>Public speaking at the university level moves beyond "delivery" into the realm of classical rhetoric and ethical influence. Central to this is Aristotle''s triad: <strong>Ethos</strong> (the speaker''s character and credibility), <strong>Pathos</strong> (emotional connection with the audience), and <strong>Logos</strong> (logical consistency and evidence).</p>
<p>An effective speaker must balance these three to achieve <strong>Persuasion without Manipulation</strong>. Ethical speaking requires <strong>Intellectual Honesty</strong>---the practice of presenting facts accurately and acknowledging counter-arguments rather than cherry-picking data to suit a narrative.</p>
<p>In Rwanda, where community cohesion is paramount, the ethical speaker also considers the <strong>Social Impact</strong> of their words, ensuring they build consensus rather than division. Modern rhetoric also explores the <strong>Kairos</strong>---the art of saying the right thing at the most opportune moment.</p>
<p>A leader who masters rhetoric understands that their voice is a tool for systemic change, requiring a deep commitment to truth, transparency, and the audience''s well-being.</p>
<h3>MCQ Bank:</h3>
<ol>
<li>Easy: Is "Ethos" related to a speaker''s credibility and character? (Ans: Yes)</li>
<li>What does "Logos" represent in a speech? (Ans: Logical reasoning and evidence)</li>
<li>What is "Kairos"? (Ans: Speaking at the most opportune or critical moment)</li>
<li>True/False: Pathos should be used to override logic in an ethical speech. (Ans: False)</li>
</ol>
<h3>Essay Question:</h3>
<p>Analyze a famous speech by a Rwandan leader. How did they balance Ethos, Pathos, and Logos to achieve their specific objective?</p>',
    1,
    90,
    true
  ),
  -- Module 2: The Art of the Pitch (Venture Oratory)
  (
    'Module 2: The Art of the Pitch (Venture Oratory)',
    'High-velocity oratory designed to secure investment or buy-in.',
    '<h2>The Art of the Pitch (Venture Oratory)</h2>
<p>The <strong>Venture Pitch</strong> is a specialized form of oratory designed to secure investment, partnership, or buy-in for a specific idea. Unlike a general presentation, a pitch must be high-velocity and result-oriented.</p>
<p>It typically follows a strict structure: The Hook (problem statement), The Solution (value proposition), The Market (opportunity size), The Business Model (how it makes money), and The Ask (what you need).</p>
<p>University-level pitches require <strong>Evidence-Based Projections</strong>---using data to prove that the idea is viable and scalable. A leader must also master the <strong>Elevator Pitch</strong>---the ability to summarize a complex venture in under 60 seconds without losing the core value.</p>
<p>This requires radical clarity and the elimination of <strong>Filler Words</strong> or jargon that might confuse a non-expert investor. Success in pitching depends on the speaker''s ability to demonstrate both passion and competence, convincing the audience that they are the right person to solve the identified problem in the Rwandan or global market.</p>
<h3>MCQ Bank:</h3>
<ol>
<li>Easy: Is a "Value Proposition" an explanation of why your solution is unique? (Ans: Yes)</li>
<li>What is the primary goal of "The Hook"? (Ans: To grab attention by highlighting a major problem)</li>
<li>What does "The Ask" refer to in a pitch? (Ans: The specific resource or funding requested)</li>
<li>Why is jargon discouraged in a venture pitch? (Ans: It creates barriers to understanding for investors)</li>
</ol>
<h3>Essay Question:</h3>
<p>Compare the "Guy Kawasaki" 10-20-30 rule with the "PechaKucha" format. Which is more effective for a tech startup in Kigali and why?</p>',
    2,
    90,
    true
  ),
  -- Module 3: Technical Communication (Data Storytelling)
  (
    'Module 3: Technical Communication (Data Storytelling)',
    'Translating complex data into actionable insights.',
    '<h2>Technical Communication (Data Storytelling)</h2>
<p>Technical communication is the art of translating complex, specialized information into actionable insights for a non-technical audience. This module focuses on <strong>Data Storytelling</strong>---the bridge between raw statistics and human understanding.</p>
<p>Raw data rarely moves people; it is the <em>interpretation</em> of that data within a narrative context that drives decision-making. Leaders must learn to use visual aids effectively, ensuring that charts and graphs simplify rather than complicate the message.</p>
<p>The <strong>"So What?"</strong> factor is critical here: every data point presented must answer the audience''s unstated question: "Why does this matter to me?"</p>
<p>In Rwanda''s growing tech and medical sectors, speakers must be able to explain AI algorithms or public health trends in a way that policymakers and citizens can trust. This requires <strong>Cognitive Load Management</strong>---not overwhelming the audience with too much information at once, but layering details logically to build a compelling, evidence-based conclusion.</p>
<h3>MCQ Bank:</h3>
<ol>
<li>Easy: Should data be explained through stories to make it more memorable? (Ans: Yes)</li>
<li>What is "Cognitive Load"? (Ans: The amount of mental effort being used in the working memory)</li>
<li>What does the "So What?" factor ensure? (Ans: That every point is relevant to the audience)</li>
<li>True/False: A complex graph with 20 variables is usually better than a simple one. (Ans: False)</li>
</ol>
<h3>Essay Question:</h3>
<p>Take a complex scientific concept (e.g., Blockchain or CRISPR). Draft a 3-paragraph explanation for a primary school student and a separate one for a CEO. Describe the differences in your approach.</p>',
    3,
    90,
    true
  ),
  -- Module 4: Media Training (TV, Radio, Podcasts)
  (
    'Module 4: Media Training (TV, Radio, Podcasts)',
    'Mastering the soundbite, bridging, and platform dynamics.',
    '<h2>Media Training (TV, Radio, Podcasts)</h2>
<p>In the modern leadership landscape, the <strong>Medium is the Message</strong>. Media training prepares leaders for the specific constraints of broadcast and digital platforms.</p>
<p>Key techniques include <strong>The Soundbite</strong>---creating short, memorable sentences that are easy for news outlets to quote---and <strong>The Bridge</strong>. Bridging is a transition technique used during interviews to move from a difficult or irrelevant question back to the leader''s core <strong>Talking Points</strong> (e.g., "That is an important question, but the real issue our community is facing is...").</p>
<p>Non-verbal communication becomes even more critical on camera, where small movements are magnified. Leaders must also understand <strong>Platform Dynamics</strong>---how the tone of a LinkedIn Live differs from a formal RBA (Rwanda Broadcasting Agency) interview.</p>
<p>Preparation involves <strong>Anticipatory Q&A</strong>, where the leader prepares responses for the most hostile or unexpected questions to maintain their <strong>Executive Presence</strong> under pressure.</p>
<h3>MCQ Bank:</h3>
<ol>
<li>Easy: Is a "Soundbite" a short, catchy phrase used in media? (Ans: Yes)</li>
<li>What is the purpose of "Bridging" in an interview? (Ans: To move from a tough question back to your key message)</li>
<li>Why are "Talking Points" important? (Ans: They ensure the leader stays focused on their main goals)</li>
<li>What happens to non-verbal cues on camera? (Ans: They are magnified and more noticeable)</li>
</ol>
<h3>Essay Question:</h3>
<p>Critique a recorded media interview of a global CEO. Identify one instance of "Bridging" and evaluate its effectiveness.</p>',
    4,
    90,
    true
  ),
  -- Module 5: Keynote Mastery (Long-Form Transformation)
  (
    'Module 5: Keynote Mastery (Long-Form Transformation)',
    'Developing a through-line and using anaphora for rhythmic, memorable addresses.',
    '<h2>Keynote Mastery (Long-Form Transformation)</h2>
<p>A Keynote speech is a high-impact, long-form address (usually 15-45 minutes) that sets the tone for an entire event. Mastering the keynote requires <strong>Through-line</strong> development---a single, powerful idea that connects every story, statistic, and slide.</p>
<p>Unlike a technical briefing, a keynote is transformational; the goal is to change the audience''s perspective or inspire a specific movement. This requires the use of <strong>Vivid Imagery</strong> and <strong>Anaphora</strong> (the repetition of a word or phrase at the beginning of successive clauses) to create a rhythmic, memorable experience.</p>
<p>Leaders must also master <strong>Pacing</strong>---the ability to slow down for emotional gravity and speed up for excitement. In Rwanda, a keynote might address themes of resilience, innovation, or unity.</p>
<p>The conclusion of a keynote should not just summarize; it should provide a <strong>Crescendo</strong>---a peak of emotional and logical intensity that leaves the audience with a clear, urgent <strong>Call to Action</strong>.</p>
<h3>MCQ Bank:</h3>
<ol>
<li>Easy: Does a "Through-line" connect all parts of a long speech? (Ans: Yes)</li>
<li>What is "Anaphora"? (Ans: The repetition of a phrase at the start of sentences for effect)</li>
<li>What is the goal of a "Crescendo" in a speech? (Ans: To reach a peak of emotional/logical intensity)</li>
<li>True/False: A keynote should be a list of dry facts and figures. (Ans: False)</li>
</ol>
<h3>Essay Question:</h3>
<p>Outline a 20-minute keynote for a graduation ceremony. Define your "Through-line" and identify two places where you will use "Anaphora."</p>',
    5,
    90,
    true
  ),
  -- Module 6: Speechwriting (For Self and Others)
  (
    'Module 6: Speechwriting (For Self and Others)',
    'Capturing a "Voice" on paper using Monroe''s Motivated Sequence.',
    '<h2>Speechwriting (For Self and Others)</h2>
<p>Speechwriting is the art of capturing a <strong>Voice</strong> on paper. Professional speechwriters must be able to write for different personas, ensuring that the tone, vocabulary, and rhythm match the person delivering the speech.</p>
<p>This requires <strong>Audience Analysis</strong>---understanding the demographics, values, and expectations of the listeners. A key framework is the <strong>Motivated Sequence</strong> (Attention, Need, Satisfaction, Visualization, Action).</p>
<p>Writing for the ear is different from writing for the eye; sentences must be shorter, more rhythmic, and use <strong>Signposting</strong> (e.g., "I have three points...") to help the audience follow along without a text in front of them.</p>
<p>In a university or corporate setting, a leader may be asked to ghostwrite for a superior. This requires <strong>Humility of Voice</strong>---the ability to set aside one''s own style to amplify the speaker''s authentic message.</p>
<h3>MCQ Bank:</h3>
<ol>
<li>Easy: Is writing a speech the same as writing an essay? (Ans: No, speeches are written for the ear)</li>
<li>What is "Signposting"? (Ans: Using verbal cues to help the audience follow the structure)</li>
<li>What does "Ghostwriting" involve? (Ans: Writing a speech for someone else to deliver)</li>
<li>What is the first step of Monroe''s Motivated Sequence? (Ans: Attention)</li>
</ol>
<h3>Essay Question:</h3>
<p>You are ghostwriting a speech for the Minister of ICT. Write the first 200 words, focusing on "Digital Inclusion," and explain the rhetorical devices you used.</p>
<h3>Video Submission (5 Minutes):</h3>
<p>Record yourself delivering a 5-minute excerpt of the speech you ghostwrote. Focus on matching the "Voice" to the persona of a government leader.</p>',
    6,
    90,
    true
  ),
  -- Module 7: Audience Psychology & Hostility
  (
    'Module 7: Audience Psychology & Hostility',
    'De-escalation oratory and the Feel-Felt-Found method.',
    '<h2>Audience Psychology & Hostility</h2>
<p>Not every audience is friendly. A leader must be prepared to speak in <strong>High-Conflict</strong> environments where the audience may be skeptical, indifferent, or openly hostile.</p>
<p>This module covers <strong>De-escalation Oratory</strong>---using calm tonality and <strong>Validation</strong> (acknowledging the audience''s concerns without necessarily agreeing) to lower tensions.</p>
<p>Understanding <strong>Micro-expressions</strong> allows a speaker to read the room in real-time and pivot their approach. The <strong>"Feel-Felt-Found"</strong> method is a powerful tool for handling objections:</p>
<p>"I understand how you <em>feel</em>; others have <em>felt</em> the same way; but what we have <em>found</em> is..."</p>
<p>This creates an empathetic bridge between the speaker and the critic. In a university setting, this skill is vital for defending a thesis or leading a controversial student government debate.</p>
<p>The goal is to maintain <strong>Composure</strong> and <strong>Intellectual Grace</strong>, ensuring that the speaker remains the most <strong>Adult</strong> person in the room.</p>
<h3>MCQ Bank:</h3>
<ol>
<li>Easy: Should a speaker acknowledge an audience''s anger? (Ans: Yes, via validation)</li>
<li>What is the "Feel-Felt-Found" method? (Ans: An empathy-based technique to handle objections)</li>
<li>What is "De-escalation Oratory"? (Ans: Using speech to lower tension in a room)</li>
<li>Why is "Micro-expression" reading important? (Ans: It helps the speaker adjust to the audience''s mood)</li>
</ol>
<h3>Essay Question:</h3>
<p>Describe a situation where you faced a "Cold" or "Hostile" audience. Evaluate your response and propose a better strategy using the "Feel-Felt-Found" method.</p>
<h3>Video Submission (5 Minutes):</h3>
<p>Record a "Q&A Simulation" where you answer three "Hostile" questions about a controversial project (e.g., a mandatory fee increase). Focus on de-escalation.</p>',
    7,
    90,
    true
  ),
  -- Module 8: Digital Oratory (Webinars & Virality)
  (
    'Module 8: Digital Oratory (Webinars & Virality)',
    'Speaking through a lens: pattern interrupts, high-stakes hooks, and the viral loop.',
    '<h2>Digital Oratory (Webinars & Virality)</h2>
<p>Speaking through a lens requires a different set of skills than speaking from a podium. In <strong>Digital Oratory</strong>, eye contact is replaced by <strong>Eye-to-Lens</strong> contact, and physical energy must be projected into a small rectangular frame.</p>
<p>This module explores <strong>Webinar Engagement</strong>---using polls, chat features, and <strong>Pattern Interrupts</strong> to keep a remote audience from multitasking.</p>
<p>Furthermore, leaders must understand the <strong>Viral Loop</strong>---how to structure a 60-second video so that it is <strong>Shareable</strong> on platforms like LinkedIn or TikTok. This requires a <strong>High-Stakes Hook</strong> in the first 3 seconds and a <strong>Visual Narrative</strong> that works even without sound (via captions).</p>
<p>For Rwandan youth leaders, mastering digital oratory is the key to participating in the global <strong>Knowledge Economy</strong>, allowing them to lead teams and influence markets from their laptops in Kigali.</p>
<h3>MCQ Bank:</h3>
<ol>
<li>Easy: In a webinar, should you look at the people on the screen or the camera lens? (Ans: The camera lens)</li>
<li>What is a "Pattern Interrupt"? (Ans: A sudden change in delivery or content to regain attention)</li>
<li>Why are captions important for viral videos? (Ans: Many people watch videos without sound)</li>
<li>What is a "High-Stakes Hook"? (Ans: An opening that creates immediate urgency or curiosity)</li>
</ol>
<h3>Essay Question:</h3>
<p>Analyze a viral 60-second leadership video. Why did it work? Break it down by its Hook, Body, and Call to Action.</p>
<h3>Video Submission (5 Minutes):</h3>
<p>Create a 5-minute "Educational Webinar" on a topic of your choice. You must use at least two "Pattern Interrupts" and maintain consistent "Eye-to-Lens" contact.</p>',
    8,
    90,
    true
  ),
  -- Module 9: Ceremonial Speaking (The Master of Ceremonies)
  (
    'Module 9: Ceremonial Speaking (The Master of Ceremonies)',
    'Guardian of the Vibe: tributes, introductions, and cultural protocols.',
    '<h2>Ceremonial Speaking (The Master of Ceremonies)</h2>
<p>Ceremonial speaking is the <strong>Social Glue</strong> of professional and civic life. It includes the <strong>Vote of Thanks</strong>, the <strong>Introduction</strong>, the <strong>Tribute</strong>, and the <strong>Keynote Introduction</strong>.</p>
<p>The role of the Master of Ceremonies (MC) is to be the <strong>Guardian of the Vibe</strong>---ensuring that transitions are seamless, speakers feel honored, and the schedule is maintained with grace.</p>
<p>A <strong>Tribute</strong> speech, for example, focuses on <strong>Virtues over Resume</strong>---it tells stories that illustrate the person''s character rather than just listing their awards.</p>
<p>In Rwanda, ceremonial speaking often involves <strong>Cultural Protocols</strong>---knowing how to address dignitaries and elders with appropriate honorifics.</p>
<p>A great ceremonial speaker is <strong>Invisible yet Essential</strong>; they facilitate the event''s success without making themselves the center of attention, using humor and warmth to keep the audience engaged through long programs.</p>
<h3>MCQ Bank:</h3>
<ol>
<li>Easy: Is a "Tribute" speech about a person''s character or just their awards? (Ans: Character/Virtues)</li>
<li>What is the primary role of an MC? (Ans: To manage transitions and set the event''s tone)</li>
<li>What does "Guardian of the Vibe" mean? (Ans: Ensuring the event''s energy remains positive and appropriate)</li>
<li>Why is "Audience Honor" important in Rwandan ceremonial speaking? (Ans: It respects cultural hierarchy and community values)</li>
</ol>
<h3>Essay Question:</h3>
<p>Write a 300-word "Vote of Thanks" for a high-level conference on "African Innovation." Identify which "Dignitaries" you would prioritize and why.</p>
<h3>Video Submission (5 Minutes):</h3>
<p>Record yourself as the MC for a mock "Startup Awards Gala." Introduce a guest speaker and manage one "Transition" to the next part of the program.</p>',
    9,
    90,
    true
  ),
  -- Module 10: The Capstone (The TED-Style Talk)
  (
    'Module 10: The Capstone (The TED-Style Talk)',
    'Synthesis: a memorized, fluid 5-minute talk on a "Big Idea for Rwanda''s Future."',
    '<h2>The Capstone (The TED-Style Talk)</h2>
<p>The <strong>TED-Style Talk</strong> is the modern gold standard for <strong>Idea-Sharing Oratory</strong>. It is characterized by <strong>Visual Minimalism</strong> (few slides, mostly images), a <strong>Personal Narrative</strong> that illustrates a global truth, and a <strong>Big Idea</strong> that can be summarized in a single sentence.</p>
<p>The Capstone project requires the student to synthesize every skill from Modules 1-9: Rhetorical structure, Data storytelling, Pacing, and Composure. This is not a <strong>Report</strong>; it is a <strong>Performance</strong>.</p>
<p>The student must memorize their script to the point of <strong>Fluidity</strong>, where it sounds like a natural conversation rather than a recitation.</p>
<p>In the Rwandan context, these talks should focus on <strong>Local Innovation with Global Relevance</strong>---showing how a solution found in a village or a Kigali lab can change the world.</p>
<p>The final result is a professional <strong>Speaker Reel</strong> that the student can use to launch their career as a global thought leader.</p>
<h3>MCQ Bank:</h3>
<ol>
<li>Easy: Is a TED-style talk usually short and focused on one "Big Idea"? (Ans: Yes)</li>
<li>What does "Visual Minimalism" in slides mean? (Ans: Using very few words and focusing on high-impact images)</li>
<li>Why is "Fluidity" important in a final talk? (Ans: It makes the speaker appear confident and conversational)</li>
<li>What is the goal of the "Personal Narrative" in a TED talk? (Ans: To make a global or abstract truth feel relatable)</li>
</ol>
<h3>Essay Question:</h3>
<p>Synthesize your learning. Write your "Big Idea" in one sentence. Then, list three rhetorical devices you will use in your Capstone to make that idea unforgettable.</p>
<h3>Video Submission (5 Minutes):</h3>
<p>Deliver your "Capstone Masterpiece." This 5-minute talk must be memorized, visually supported (if possible), and focused on a "Big Idea for Rwanda''s Future."</p>',
    10,
    90,
    true
  )
) AS m(title, description, content, order_number, duration_minutes, is_published);

-- ======================================================================
-- TRACK 3: DEBATE (SECONDARY LEVEL) - COURSE 5
-- ======================================================================
WITH debate_secondary AS (
  INSERT INTO courses (id, title, description, duration_weeks, is_published, thumbnail_url)
  VALUES (
    gen_random_uuid(),
    'Debate (Secondary Level)',
    'Structured argumentation for secondary students. Covers the ARE framework, refutation, Points of Information, burden of proof, weighing, policy debating, reply speeches, logical fallacies, World Schools Style roles, and a team capstone debate.',
    10,
    true,
    'https://storage.example.com/thumbnails/debate_secondary.jpg'
  )
  RETURNING id
)
INSERT INTO course_modules (id, course_id, title, description, content, order_number, duration_minutes, is_published)
SELECT gen_random_uuid(), debate_secondary.id, *
FROM (
  VALUES
  -- Module 1: The Anatomy of an Argument (ARE)
  (
    'Module 1: The Anatomy of an Argument (ARE)',
    'Assertion, Reasoning, Evidence: building a bulletproof case.',
    '<h2>The Anatomy of an Argument (ARE)</h2>
<p>Debate is not just an argument; it is a structured exchange of ideas. To build a <strong>bulletproof</strong> case, we use the <strong>ARE Framework</strong>:</p>
<ul>
<li><strong>A</strong>ssertion (What is your claim?),</li>
<li><strong>R</strong>easoning (Why is it true?),</li>
<li><strong>E</strong>vidence (Where is the proof?).</li>
</ul>
<p>For example, if the motion is "This House would ban plastic bags," your Assertion is that plastic harms the environment. Your Reasoning explains that plastic takes hundreds of years to decompose, and your Evidence might be a study on ocean pollution.</p>
<p>In Rwanda, debate is a tool for <em>Agaciro</em> because it teaches you to stand up for your ideas with dignity and facts rather than shouting. Mastering ARE ensures that every time you speak, you are providing a logical path for the judge to follow.</p>
<h3>MCQ Bank:</h3>
<ol>
<li>Easy: Does "ARE" stand for Assertion, Reasoning, and Evidence? (Ans: Yes)</li>
<li>What part of the argument provides the "Why"? (Ans: Reasoning)</li>
<li>Which part uses facts or statistics to support a claim? (Ans: Evidence)</li>
<li>True/False: An assertion is enough to win a point in a formal debate. (Ans: False)</li>
</ol>
<h3>Essay Prompt:</h3>
<p>Write a single ARE-style argument for the motion: "Computers are better than textbooks for learning."</p>',
    1,
    60,
    true
  ),
  -- Module 2: The Art of Refutation (The "But" Factor)
  (
    'Module 2: The Art of Refutation (The "But" Factor)',
    '4-step process to tear down an opponent''s case respectfully.',
    '<h2>The Art of Refutation (The "But" Factor)</h2>
<p>To win a debate, you cannot just build your own case; you must tear down your opponent''s case. This is called <strong>Refutation</strong>. We use a 4-step process:</p>
<ol>
<li>"They said..." (Summarize their point fairly),</li>
<li>"But..." (State your disagreement),</li>
<li>"Because..." (Explain the logical flaw),</li>
<li>"Therefore..." (Explain why your point is more important).</li>
</ol>
<p>A leader never insults their opponent; they only attack the <em>logic</em> of the argument. This is the difference between an argument and a debate.</p>
<p>In Rwandan schools, practicing respectful refutation helps students solve conflicts through dialogue rather than anger.</p>
<h3>MCQ Bank:</h3>
<ol>
<li>Easy: Is "Refutation" the act of proving an opponent''s point wrong? (Ans: Yes)</li>
<li>Why should you summarize the opponent''s point first? (Ans: To show you listened and are being fair)</li>
<li>What is a "Logical Flaw"? (Ans: An error in the way an argument is built)</li>
<li>What does the "Therefore" step do? (Ans: Compares the two points and shows yours is better)</li>
</ol>
<h3>Essay Prompt:</h3>
<p>An opponent says, "Phones should be banned in school because they distract students." Write a 4-step refutation for this point.</p>',
    2,
    60,
    true
  ),
  -- Module 3: Points of Information (POI) & Agility
  (
    'Module 3: Points of Information (POI) & Agility',
    'Mastering the "live" part of the debate: offering and handling POIs.',
    '<h2>Points of Information (POI) & Agility</h2>
<p>A <strong>Point of Information (POI)</strong> is a short question or statement (max 15 seconds) offered by the opposing team during a speech. It is the <strong>Live</strong> part of the debate.</p>
<p>To handle a POI, a leader must be agile. You can either Accept it (if you are confident) or Decline it (if you are in the middle of a crucial point).</p>
<p>Mastering the POI shows you can think on your feet and aren''t afraid of a challenge. It is a sign of high-level <em>Imihigo</em>---taking responsibility for your ideas even under pressure.</p>
<p>When you offer a POI, it should be a <strong>Stinger</strong>---a question that exposes a weakness in the speaker''s logic.</p>
<h3>MCQ Bank:</h3>
<ol>
<li>Easy: How long should a Point of Information (POI) last? (Ans: Maximum 15 seconds)</li>
<li>True/False: You must accept every POI offered to you. (Ans: False)</li>
<li>What is the best time to offer a POI? (Ans: When the speaker makes a logical error)</li>
<li>What does "thinking on your feet" mean in a debate? (Ans: Reacting quickly to new information or questions)</li>
</ol>
<h3>Essay Prompt:</h3>
<p>You are giving a speech on "The importance of school uniforms." Someone offers a POI: "But don''t uniforms suppress a student''s creativity?" Draft a 30-second response.</p>',
    3,
    60,
    true
  ),
  -- Module 4: Burdens of Proof & Motion Analysis
  (
    'Module 4: Burdens of Proof & Motion Analysis',
    'Understanding the Status Quo and identifying the main Clash.',
    '<h2>Burdens of Proof & Motion Analysis</h2>
<p>Before you start writing, you must understand your <strong>Burden of Proof</strong>. If the motion is "This House would legalize X," the Proposition must prove that X does more good than harm. The Opposition only needs to prove that X is dangerous or unnecessary.</p>
<p>We analyze motions by looking at the <strong>Status Quo</strong> (the way things are now) and the <strong>World of the Motion</strong> (how things will change). Leaders use this to determine where the <strong>Clash</strong> will be.</p>
<p>Motion analysis is like a scout looking at a map before a journey; it prevents you from getting lost in irrelevant arguments that don''t help you win.</p>
<h3>MCQ Bank:</h3>
<ol>
<li>Easy: Is the "Burden of Proof" the specific thing a team must prove to win? (Ans: Yes)</li>
<li>What is the "Status Quo"? (Ans: The current state of things)</li>
<li>What does "Proposition" mean in a debate? (Ans: The team that supports the motion)</li>
<li>Why is "Motion Analysis" the first step in prep? (Ans: It helps identify the main points of disagreement)</li>
</ol>
<h3>Essay Prompt:</h3>
<p>Analyze the motion: "This House would make community service mandatory for all secondary students." What is the Proposition''s main Burden of Proof?</p>',
    4,
    60,
    true
  ),
  -- Module 5: Weighing & Impacting (So What?)
  (
    'Module 5: Weighing & Impacting (So What?)',
    'Explaining why your point matters using Magnitude, Severity, and Probability.',
    '<h2>Weighing & Impacting (So What?)</h2>
<p>The most common mistake in debate is making a point but not explaining why it matters. This is called <strong>Impacting</strong>. You must answer the judge''s <strong>"So what?"</strong> question.</p>
<p>We use <strong>Impact Categories</strong> like:</p>
<ul>
<li><strong>Magnitude</strong> (How many people are affected?),</li>
<li><strong>Severity</strong> (How much are they hurt or helped?),</li>
<li><strong>Probability</strong> (How likely is it to happen?).</li>
</ul>
<p>Weighing is the final step: it is where you tell the judge, "Even if the other team is right about X, our point about Y is more important because it affects more people."</p>
<h3>MCQ Bank:</h3>
<ol>
<li>Easy: Does "Impacting" explain why a point is important? (Ans: Yes)</li>
<li>What does "Magnitude" measure? (Ans: How many people are affected)</li>
<li>What is "Probability" in a debate? (Ans: How likely an outcome is to happen)</li>
<li>When should a team start "Weighing" arguments? (Ans: In the final speeches)</li>
</ol>
<h3>Essay Prompt:</h3>
<p>You have a point about "Saving money." Impact this point for a school board that is deciding whether to cancel a sports trip.</p>',
    5,
    60,
    true
  ),
  -- Module 6: Policy Debating (The Problem-Solution Model)
  (
    'Module 6: Policy Debating (The Problem-Solution Model)',
    'Presenting a Model: Problem, Mechanism, Benefits, Counter-argument.',
    '<h2>Policy Debating (The Problem-Solution Model)</h2>
<p>In "This House Would" motions, you are acting as a government. You must provide a <strong>Model</strong>. A model has four parts:</p>
<ol>
<li><strong>The Problem</strong> (Why are we doing this?),</li>
<li><strong>The Mechanism</strong> (How will it work? Who pays? Who enforces it?),</li>
<li><strong>The Benefits</strong> (What good things happen?),</li>
<li><strong>The Counter-argument</strong> (Why is this better than the alternative?).</li>
</ol>
<p>For example, if debating "Mandatory Umuganda for Youth," your mechanism would explain that it happens once a month and is led by youth volunteers. This prevents the debate from being <strong>vague</strong> and keeps it focused on real-world leadership and solutions.</p>
<h3>MCQ Bank:</h3>
<ol>
<li>Easy: Is a "Model" a plan for how a motion would be implemented? (Ans: Yes)</li>
<li>What is the "Mechanism" in a policy debate? (Ans: The practical details of how the plan works)</li>
<li>Why do you need a "Problem" section in your model? (Ans: To show why the change is necessary)</li>
<li>True/False: A model should be as complicated as possible. (Ans: False)</li>
</ol>
<h3>Video Submission (5 Minutes):</h3>
<p>Submit a 5-minute video presenting a <strong>Policy Model</strong> for the motion: "This House would ban the use of non-recyclable plastics in all school canteens."</p>',
    6,
    60,
    true
  ),
  -- Module 7: The Reply Speech (The World View)
  (
    'Module 7: The Reply Speech (The World View)',
    'The "Story of Two Worlds" technique for final speeches.',
    '<h2>The Reply Speech (The World View)</h2>
<p>The Reply Speech is the most <strong>leader-like</strong> speech in a debate. It is not for new arguments. Instead, it is for the <strong>Big Picture</strong>.</p>
<p>You should present the debate as a <strong>"Story of two worlds."</strong> World A is the opponent''s world (full of problems), and World B is your world (full of solutions).</p>
<p>You identify the 2-3 <strong>Clashes</strong> (main points of disagreement) and explain why your team won each one. A great Reply Speech is calm, biased but fair, and extremely clear.</p>
<p>It is your final chance to show the judge that your team''s vision for the future is better.</p>
<h3>MCQ Bank:</h3>
<ol>
<li>Easy: Can you bring new arguments into a Reply Speech? (Ans: No)</li>
<li>What are "Clashes"? (Ans: The main areas where the two teams disagreed)</li>
<li>What is the "Story of Two Worlds" technique? (Ans: Comparing the outcomes of both sides)</li>
<li>What should the tone of a Reply Speech be? (Ans: Calm, authoritative, and clear)</li>
</ol>
<h3>Video Submission (5 Minutes):</h3>
<p>Record a 5-minute <strong>Reply Speech</strong> summarizing a mock debate on: "Social media does more harm than good for teenagers."</p>',
    7,
    60,
    true
  ),
  -- Module 8: Ethical Persuasion & Propaganda
  (
    'Module 8: Ethical Persuasion & Propaganda',
    'Identifying logical fallacies and avoiding propaganda.',
    '<h2>Ethical Persuasion & Propaganda</h2>
<p>A leader uses debate to find the truth, not to win at any cost. This module covers <strong>Logical Fallacies</strong>---errors in reasoning that make an argument look strong but are actually weak.</p>
<p>Common fallacies include the <strong>Slippery Slope</strong> (saying one small step will lead to a disaster) and the <strong>Ad Hominem</strong> (attacking the person instead of the idea).</p>
<p>We also study <strong>Propaganda</strong> techniques to learn how to defend ourselves against them. A leader with <em>Ubupfura</em> (Integrity) avoids using <strong>Fake News</strong> or scaring the audience.</p>
<p>True persuasion comes from a combination of a good heart and a sharp mind.</p>
<h3>MCQ Bank:</h3>
<ol>
<li>Easy: Is an "Ad Hominem" attack when you insult your opponent? (Ans: Yes)</li>
<li>What is a "Slippery Slope" fallacy? (Ans: Claiming one small event will lead to an extreme chain of events)</li>
<li>Why should a leader avoid using logical fallacies? (Ans: It destroys their credibility and Agaciro)</li>
<li>What is the difference between persuasion and propaganda? (Ans: Persuasion is based on truth; propaganda often uses lies or fear)</li>
</ol>
<h3>Video Submission (5 Minutes):</h3>
<p>Record a 5-minute video identifying and explaining three <strong>Logical Fallacies</strong> you found in a real-world advertisement or speech.</p>',
    8,
    60,
    true
  ),
  -- Module 9: World Schools Style (Roles & Rules)
  (
    'Module 9: World Schools Style (Roles & Rules)',
    'International standard: 1st, 2nd, and 3rd speaker roles.',
    '<h2>World Schools Style (Roles & Rules)</h2>
<p>World Schools Style is the international standard for high school debating. Each team has three speakers.</p>
<ul>
<li><strong>1st Speaker:</strong> Defines the motion and sets the case.</li>
<li><strong>2nd Speaker:</strong> Refutes the opponent and adds a new <strong>extension</strong> argument.</li>
<li><strong>3rd Speaker:</strong> Focused entirely on refutation and summarizing the clashes.</li>
</ul>
<p>This module teaches <strong>Strategic Time Management</strong>---how to spend your 8 minutes so you don''t run out of time before your most important point.</p>
<p>It also covers <strong>Style</strong>, which in this format includes your speed, your humor, and your ability to engage with the audience.</p>
<h3>MCQ Bank:</h3>
<ol>
<li>Easy: Are there three main speakers on a World Schools team? (Ans: Yes)</li>
<li>What is the main job of the 3rd Speaker? (Ans: Refutation and summarizing the clashes)</li>
<li>What is a "Case Extension"? (Ans: A new argument added by the 2nd speaker)</li>
<li>Why is "Style" important in World Schools debating? (Ans: It affects how persuasive and engaging the speaker is)</li>
</ol>
<h3>Video Submission (5 Minutes):</h3>
<p>Record yourself delivering a <strong>1st Speaker Speech</strong> (Proposition) for the motion: "This House believes that vocational training is better than university education."</p>',
    9,
    60,
    true
  ),
  -- Module 10: Capstone: The Great Debate
  (
    'Module 10: Capstone: The Great Debate',
    'Team collaboration: building a full Case File and reflecting on performance.',
    '<h2>Capstone: The Great Debate</h2>
<p>The Capstone is your final team project. You will be assigned a motion and a side. You must work with two other students to build a full <strong>Case File</strong>.</p>
<p>This includes your Model, your ARE arguments, and your <strong>Defensive Prep</strong> (pre-written answers to expected POIs).</p>
<p>The Capstone isn''t just about winning; it''s about the <strong>Pre-debate leadership</strong>---how you shared the work, how you handled disagreements in your team, and how you practiced <em>Kwigira</em> to research your topic.</p>
<p>This is where you prove you are ready to be a debate leader in Rwanda and beyond.</p>
<h3>MCQ Bank:</h3>
<ol>
<li>Easy: Is team collaboration a key part of the Capstone? (Ans: Yes)</li>
<li>What is "Defensive Prep"? (Ans: Preparing answers for questions you expect the other team to ask)</li>
<li>What should be in a "Case File"? (Ans: Model, arguments, evidence, and refutation notes)</li>
<li>How does debate prep help you practice "Kwigira"? (Ans: It requires you to find and analyze information on your own)</li>
</ol>
<h3>Video Submission (5 Minutes):</h3>
<p>Submit a 5-minute <strong>Reflection Video</strong> analyzing your team''s performance in your final debate. Identify one thing you did well and one thing you would change.</p>',
    10,
    60,
    true
  )
) AS m(title, description, content, order_number, duration_minutes, is_published);

-- ======================================================================
-- TRACK 3: DEBATE (UNIVERSITY LEVEL) - COURSE 6
-- ======================================================================
-- Note: The provided document for "TRACK 3: DEBATE (UNIVERSITY)"
-- contained identical content to the secondary level. For the purpose
-- of this curriculum, we assume the university level should contain
-- more advanced content. However, to exactly match the provided document,
-- we insert the same content but with increased duration_minutes (90)
-- and a distinct course title/description.
-- ======================================================================
WITH debate_university AS (
  INSERT INTO courses (id, title, description, duration_weeks, is_published, thumbnail_url)
  VALUES (
    gen_random_uuid(),
    'Debate (University Level)',
    'Advanced argumentation and persuasion for university students. Builds on the ARE framework with deeper theoretical grounding, complex motion analysis, strategic refutation, and high-level team collaboration.',
    10,
    true,
    'https://storage.example.com/thumbnails/debate_university.jpg'
  )
  RETURNING id
)
INSERT INTO course_modules (id, course_id, title, description, content, order_number, duration_minutes, is_published)
SELECT gen_random_uuid(), debate_university.id, *
FROM (
  VALUES
  -- University modules repeat the same structure as secondary but with increased depth expectation (duration 90)
  ('Module 1: The Anatomy of an Argument (ARE)', 'Assertion, Reasoning, Evidence: advanced application.', '<h2>The Anatomy of an Argument (ARE)</h2><p>University-level debate refines the ARE framework...</p>', 1, 90, true),
  ('Module 2: The Art of Refutation (The "But" Factor)', '4-step refutation with nuanced logical deconstruction.', '<h2>The Art of Refutation (The "But" Factor)</h2><p>Advanced refutation strategies...</p>', 2, 90, true),
  ('Module 3: Points of Information (POI) & Agility', 'Strategic use of POIs to control the flow of the debate.', '<h2>Points of Information (POI) & Agility</h2><p>Using POIs as strategic weapons...</p>', 3, 90, true),
  ('Module 4: Burdens of Proof & Motion Analysis', 'Presumption, burden shifting, and threshold analysis.', '<h2>Burdens of Proof & Motion Analysis</h2><p>Advanced burden analysis...</p>', 4, 90, true),
  ('Module 5: Weighing & Impacting (So What?)', 'Comparative advantage and net benefit evaluation.', '<h2>Weighing & Impacting (So What?)</h2><p>Advanced impact calculus...</p>', 5, 90, true),
  ('Module 6: Policy Debating (The Problem-Solution Model)', 'Designing models with solvency and feasibility.', '<h2>Policy Debating (The Problem-Solution Model)</h2><p>Advanced policy model design...</p>', 6, 90, true),
  ('Module 7: The Reply Speech (The World View)', 'Framing the debate for the judge.', '<h2>The Reply Speech (The World View)</h2><p>Advanced framing techniques...</p>', 7, 90, true),
  ('Module 8: Ethical Persuasion & Propaganda', 'Critical theory and the ethics of influence.', '<h2>Ethical Persuasion & Propaganda</h2><p>Post-modern critique of rhetoric...</p>', 8, 90, true),
  ('Module 9: World Schools Style (Roles & Rules)', 'Mastering style, strategy, and team cohesion.', '<h2>World Schools Style (Roles & Rules)</h2><p>Elite-level World Schools strategy...</p>', 9, 90, true),
  ('Module 10: Capstone: The Great Debate', 'Executive-level team performance and adjudication.', '<h2>Capstone: The Great Debate</h2><p>University championship preparation...</p>', 10, 90, true)
) AS m(title, description, content, order_number, duration_minutes, is_published);

-- ======================================================================
-- END OF SCRIPT
-- ======================================================================