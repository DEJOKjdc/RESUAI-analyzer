import React, { useState } from 'react';
import { FileText, X } from 'lucide-react';

const templates: Record<string, { name: string; title: string; code: string }> = {
  template1: {
    name: "Jake's Resume",
    title: "Jake Ryan Resume (ATS Optimized LaTeX)",
    code: `
\\documentclass[letterpaper,11pt]{article}

\\usepackage{latexsym}
\\usepackage[empty]{fullpage}
\\usepackage{titlesec}
\\usepackage{marvosym}
\\usepackage[usenames,dvipsnames]{color}
\\usepackage{verbatim}
\\usepackage{enumitem}
\\usepackage[hidelinks]{hyperref}
\\usepackage{fancyhdr}
\\usepackage[english]{babel}
\\usepackage{tabularx}
\\input{glyphtounicode}

%----------FONT OPTIONS----------
% sans-serif
% \\usepackage[sfdefault]{FiraSans}
% \\usepackage[sfdefault]{roboto}
% \\usepackage[sfdefault]{noto-sans}
% \\usepackage[default]{sourcesanspro}

% serif
% \\usepackage{CormorantGaramond}
% \\usepackage{charter}

\\pagestyle{fancy}
\\fancyhf{}
\\fancyfoot{}
\\renewcommand{\\headrulewidth}{0pt}
\\renewcommand{\\footrulewidth}{0pt}

% Adjust margins
\\addtolength{\\oddsidemargin}{-0.5in}
\\addtolength{\\evensidemargin}{-0.5in}
\\addtolength{\\textwidth}{1in}
\\addtolength{\\topmargin}{-.5in}
\\addtolength{\\textheight}{1.0in}

\\urlstyle{same}
\\raggedbottom
\\raggedright
\\setlength{\\tabcolsep}{0in}

% Section formatting
\\titleformat{\\section}{
  \\vspace{-4pt}\\scshape\\raggedright\\large
}{}{0em}{}[\\color{black}\\titlerule \\vspace{-5pt}]

% Ensure ATS-readable PDF
\\pdfgentounicode=1

%-------------------------
% Custom commands
\\newcommand{\\resumeItem}[1]{
  \\item\\small{
    {#1 \\vspace{-2pt}}
  }
}

\\newcommand{\\resumeSubheading}[4]{
  \\vspace{-2pt}\\item
    \\begin{tabular*}{0.97\\textwidth}[t]{l@{\\extracolsep{\\fill}}r}
      \\textbf{#1} & #2 \\\\
      \\textit{\\small#3} & \\textit{\\small #4} \\\\
    \\end{tabular*}\\vspace{-7pt}
}

\\newcommand{\\resumeSubSubheading}[2]{
    \\item
    \\begin{tabular*}{0.97\\textwidth}{l@{\\extracolsep{\\fill}}r}
      \\textit{\\small#1} & \\textit{\\small #2} \\\\
    \\end{tabular*}\\vspace{-7pt}
}

\\newcommand{\\resumeProjectHeading}[2]{
    \\item
    \\begin{tabular*}{0.97\\textwidth}{l@{\\extracolsep{\\fill}}r}
      \\small#1 & #2 \\\\
    \\end{tabular*}\\vspace{-7pt}
}

\\newcommand{\\resumeSubItem}[1]{\\resumeItem{#1}\\vspace{-4pt}}
\\renewcommand\\labelitemii{$\\vcenter{\\hbox{\\tiny$\\bullet$}}$}

\\newcommand{\\resumeSubHeadingListStart}{\\begin{itemize}[leftmargin=0.15in, label={}]} 
\\newcommand{\\resumeSubHeadingListEnd}{\\end{itemize}} 
\\newcommand{\\resumeItemListStart}{\\begin{itemize}} 
\\newcommand{\\resumeItemListEnd}{\\end{itemize}\\vspace{-5pt}}

%-------------------------------------------
%%%%%%  RESUME STARTS HERE  %%%%%%%%%%%%%%%%%%%%%%%%%%%%

\\begin{document}

%----------HEADING----------
\\begin{center}
    \\textbf{\\Huge \\scshape Jake Ryan} \\\\ \\vspace{1pt}
    \\small 123-456-7890 $|$ \\href{mailto:x@x.com}{\\underline{jake@su.edu}} $|$ 
    \\href{https://linkedin.com/in/...}{\\underline{linkedin.com/in/jake}} $|$
    \\href{https://github.com/...}{\\underline{github.com/jake}}
\\end{center}

%-----------EDUCATION-----------
\\section{Education}
  \\resumeSubHeadingListStart
    \\resumeSubheading
      {Southwestern University}{Georgetown, TX}
      {Bachelor of Arts in Computer Science, Minor in Business}{Aug. 2018 -- May 2021}
    \\resumeSubheading
      {Blinn College}{Bryan, TX}
      {Associate's in Liberal Arts}{Aug. 2014 -- May 2018}
  \\resumeSubHeadingListEnd

%-----------EXPERIENCE-----------
\\section{Experience}
  \\resumeSubHeadingListStart
    \\resumeSubheading
      {Undergraduate Research Assistant}{June 2020 -- Present}
      {Texas A\\&M University}{College Station, TX}
      \\resumeItemListStart
        \\resumeItem{Developed a REST API using FastAPI and PostgreSQL to store data from learning management systems}
        \\resumeItem{Built a full-stack web application using Flask, React, PostgreSQL, and Docker to analyze GitHub data}
        \\resumeItem{Explored ways to visualize GitHub collaboration in a classroom setting}
      \\resumeItemListEnd

    \\resumeSubheading
      {Information Technology Support Specialist}{Sep. 2018 -- Present}
      {Southwestern University}{Georgetown, TX}
      \\resumeItemListStart
        \\resumeItem{Communicated with managers to configure campus computers}
        \\resumeItem{Troubleshot hardware/software issues for students and faculty}
        \\resumeItem{Maintained over 200 printers and classroom devices across campus}
    \\resumeItemListEnd

    \\resumeSubheading
      {Artificial Intelligence Research Assistant}{May 2019 -- July 2019}
      {Southwestern University}{Georgetown, TX}
      \\resumeItemListStart
        \\resumeItem{Developed Java game to test generated dungeons based on *The Legend of Zelda*}
        \\resumeItem{Presented at the World Conference on Computational Intelligence}
        \\resumeItem{Authored an 8-page research paper and led campus presentations}
      \\resumeItemListEnd
  \\resumeSubHeadingListEnd

%-----------PROJECTS-----------
\\section{Projects}
  \\resumeSubHeadingListStart
    \\resumeProjectHeading
      {\\textbf{Gitlytics} $|$ \\emph{Python, Flask, React, PostgreSQL, Docker}}{June 2020 -- Present}
      \\resumeItemListStart
        \\resumeItem{Developed full-stack web app using Flask REST API with React frontend}
        \\resumeItem{Integrated GitHub OAuth to fetch repository collaboration data}
        \\resumeItem{Used Celery + Redis for asynchronous task management}
      \\resumeItemListEnd
    \\resumeProjectHeading
      {\\textbf{Simple Paintball} $|$ \\emph{Spigot API, Java, Maven, TravisCI, Git}}{May 2018 -- May 2020}
      \\resumeItemListStart
        \\resumeItem{Built a Minecraft plugin with 2K+ downloads and 4.5/5 average rating}
        \\resumeItem{Implemented continuous delivery using TravisCI for automatic builds}
      \\resumeItemListEnd
  \\resumeSubHeadingListEnd

%-----------TECHNICAL SKILLS-----------
\\section{Technical Skills}
 \\begin{itemize}[leftmargin=0.15in, label={}]
    \\small{\\item{
     \\textbf{Languages}{: Java, Python, C/C++, SQL (Postgres), JavaScript, HTML/CSS, R} \\\\
     \\textbf{Frameworks}{: React, Node.js, Flask, JUnit, WordPress, Material-UI, FastAPI} \\\\
     \\textbf{Developer Tools}{: Git, Docker, TravisCI, Google Cloud, VS Code, IntelliJ} \\\\
     \\textbf{Libraries}{: pandas, NumPy, Matplotlib}
    }}
 \\end{itemize}

\\end{document}
`
  },
  template2: {
    name: "Soel Niju's Resume",
    title: "Soel Niju's Resume Template Latex Code",
    code: `
\\documentclass[letterpaper,10pt]{article}

\\usepackage[empty]{fullpage}
\\usepackage{titlesec}
\\usepackage{enumitem}
\\usepackage[hidelinks]{hyperref}
\\usepackage{fancyhdr}
\\usepackage{fontawesome5}
\\usepackage{multicol}
\\usepackage{bookmark}
\\usepackage{lastpage}

\\usepackage{CormorantGaramond}
\\usepackage{charter}

\\usepackage{xcolor}
\\definecolor{accentTitle}{HTML}{0e6e55}
\\definecolor{accentText}{HTML}{0e6e55}
\\definecolor{accentLine}{HTML}{a16f0b}

% Misc. Options
\\pagestyle{fancy}
\\fancyhf{}
\\fancyfoot{}
\\renewcommand{\\headrulewidth}{0pt}
\\renewcommand{\\footrulewidth}{0pt}
\\urlstyle{same}

% Adjust Margins
\\addtolength{\\oddsidemargin}{-0.7in}
\\addtolength{\\evensidemargin}{-0.5in}
\\addtolength{\\textwidth}{1.19in}
\\addtolength{\\topmargin}{-0.7in}
\\addtolength{\\textheight}{1.4in}

\\setlength{\\multicolsep}{-3.0pt}
\\setlength{\\columnsep}{-1pt}
\\setlength{\\tabcolsep}{0pt}
\\setlength{\\footskip}{3.7pt}
\\raggedbottom
\\raggedright

% ATS Readability
\\input{glyphtounicode}
\\pdfgentounicode=1

%-----------------%
% Custom Commands %
%-----------------%

\\newcommand{\\documentTitle}[2]{
  \\begin{center}
    {\\Huge\\color{accentTitle} #1}
    \\vspace{10pt}
    {\\color{accentLine} \\hrule}
    \\vspace{2pt}
    \\footnotesize{#2}
    \\vspace{2pt}
    {\\color{accentLine} \\hrule}
  \\end{center}
}

% Create a footer with correct padding
% Usage: \\documentFooter{\\thepage of X}
\\newcommand{\\documentFooter}[1]{
  \\setlength{\\footskip}{10.25pt}
  \\fancyfoot[C]{\\footnotesize #1}
}

\\newcommand{\\numberedPages}{
  \\documentFooter{\\thepage/\\pageref{LastPage}}
}

% Section heading with horizontal rule
% Usage: \\section{Title}
\\titleformat{\\section}{
  \\vspace{-5pt}
  \\color{accentText}
  \\raggedright\\large\\bfseries
}{}{0em}{}[\\color{accentLine}\\titlerule]

% Section heading with separator and content on same line
% Usage: \\tinysection{Title}
\\newcommand{\\tinysection}[1]{
  \\phantomsection
  \\addcontentsline{toc}{section}{#1}
  {\\large{\\bfseries\\color{accentText}#1} {\\color{accentLine} |}}
}

% Indented line with arguments left/right aligned in document
% Usage: \\heading{Left}{Right}
\\newcommand{\\heading}[2]{
  \\hspace{10pt}#1\\hfill#2\\\\
}

% Adds \\textbf to \\heading
\\newcommand{\\headingBf}[2]{
  \\heading{\\textbf{#1}}{\\textbf{#2}}
}

% Adds \\textit to \\heading
\\newcommand{\\headingIt}[2]{
  \\heading{\\textit{#1}}{\\textit{#2}}
}

% Template for itemized lists
% Usage: \\begin{resume_list} [items] \\end{resume_list}
\\newenvironment{resume_list}{
  \\vspace{-7pt}
  \\begin{itemize}[itemsep=-2px, parsep=1pt, leftmargin=30pt]
}{
  \\end{itemize}
}

% Formats an item to use as an itemized title
% Usage: \\itemTitle{Title}
\\newcommand{\\itemTitle}[1]{
  \\item[] \\underline{#1}\\vspace{4pt}
}

% Bullets used in itemized lists
\\renewcommand\\labelitemi{--}

\\begin{document}

  %---------%
  % Heading %
  %---------%

  \\documentTitle{SOEL NIJU}{
    \\href{tel:1234567890}{
      \\raisebox{-0.05\\height} \\faPhone\\ 123-456-7890} ~ | ~
    \\href{mailto:user@domain.tld}{
      \\raisebox{-0.15\\height} \\faEnvelope\\ USER@domain.tld} ~ | ~
    \\href{https://linkedin.com/in/USER/}{
      \\raisebox{-0.15\\height} \\faLinkedin\\ linkedin.com/in/USER} ~ | ~
    \\href{https://github.com/USER}{
      \\raisebox{-0.15\\height} \\faGithub\\ github.com/USER}
  }

  %---------%
  % Summary %
  %---------%

  \\tinysection{Summary}
  Simplified version of a monstrosity that I built back in college using current best practices.

  %--------%
  % Skills %
  %--------%

  \\section{Skills}

  \\begin{multicols}{2}
    \\begin{itemize}[itemsep=-2px, parsep=1pt, leftmargin=75pt]
      \\item[\\textbf{Automation}] SaltStack, Ansible, Chef, Puppet
      \\item[\\textbf{Cloud}] Salt-Cloud, Linode, GCP, AWS
      \\item[\\textbf{Languages}] Python, Bash, PHP, Perl, VB/C\\#.Net
      \\item[\\textbf{OS}] Debian, Ubuntu, CentOS, BSD, AIX
      \\item[\\textbf{Policies}] CIS, SOC2, PCI-DSS, GDPR, ITIL
      \\item[\\textbf{Testing}] Pytest, Docker, CircleCI, Jenkins, Inspec
    \\end{itemize}
  \\end{multicols}

  %------------%
  % Experience %
  %------------%

  \\section{Experience}

  \\headingBf{Consulting Corp}{Jul 2015 -- Jun 2025}
  \\headingIt{Senior DevOps Engineer (FTE Consultant)}{}
  \\begin{resume_list}
    \\itemTitle{Client: Notable Placement}
    \\item Analyzed network traffic patterns to identify bottlenecks and optimize performance
    \\item Implemented firewall rules to enhance network security and prevent unauthorized access
    \\item Conducted regular vulnerability assessments and applied patches to secure systems
    \\item Collaborated with cross-functional teams to streamline IT processes and improve efficiency
    \\vspace{3pt}
    \\itemTitle{Client: Challenges Unlimited}
    \\item Configured monitoring tools to track system performance and troubleshoot issues proactively
    \\item Automated routine tasks using scripts to reduce manual effort and increase productivity
    \\item Documented system configurations and procedures for knowledge sharing within the team
    \\item Participated in disaster recovery planning and drills to ensure business continuity in case of emergencies
    \\vspace{3pt}
    \\itemTitle{Client: Broken Galleries}
    \\item Implemented cloud migration strategies to move applications to a hybrid environment
    \\item Optimized database performance through indexing and query tuning techniques
    \\item Conducted capacity planning and scalability assessments to support future growth
    \\item Provided on-call support for critical issues and worked on root cause analysis for incident resolution
  \\end{resume_list}

  \\headingBf{HealthCo Industries}{Feb 2011 -- Mar 2016}
  \\headingIt{Senior Systems Administrator (SRE)}{}
  \\begin{resume_list}
    \\item Managed virtualized server environment spanning multiple data centers
    \\item Oversaw migration of critical business applications to cloud-based platforms
    \\item Configured and monitored network security measures, including firewalls and intrusion detection systems
    \\item Implemented multi-factor authentication for remote access to company systems
    \\item Streamlined patch management process, reducing vulnerabilities and downtime
    \\item Conducted regular vulnerability assessments and penetration testing
    \\item Automated server provisioning and configuration management tasks
    \\item Maintained documentation for IT policies and procedures
    \\item Coordinated responses to cybersecurity incidents with internal teams and external vendors
  \\end{resume_list}

  %-----------%
  % Education %
  %-----------%

  \\section{Education}

  \\headingBf{State University}{} % Note: Adding year(s) exposes an implied age
  \\headingIt{Bachelor of Science in Computer Information Systems}{}
  \\headingIt{Minors: Networking ; Network Security}{}

  \\vspace{5pt}
  \\headingBf{Certifications}{}
  \\begin{resume_list}
    \\item Salt \\hspace{2pt}- SaltStack Certified Engineer
    \\item GCP - Professional Cloud Architect
  \\end{resume_list}

  %----------------------------%
  % Extracurricular Activities %
  %----------------------------%

  \\section{Projects}

  \\headingBf{Hospital / Health Science IRB}{Mar 2015 -- Present}
  \\begin{resume_list}
    \\item Served as non-scientific/unaffiliated patient-representative
    \\item Reviewed patient consent forms for completeness, accuracy, and clarity
    \\item Became familiar with industry standards and regulations (OHRP, HIPAA)
  \\end{resume_list}

  \\headingBf{Debian Linux}{Jan 2001 -- Present}
  \\begin{resume_list}
    \\item Maintained packages in Debian repositories
    \\item Reviewed and sponsored packages on behalf of prospective Developers
    \\item Resolved bugs reported in bug tracking system
  \\end{resume_list}

\\end{document}
`
  },
  template3: {
    name: "Kunal's Resume",
    title: "Kunal's Resume Template Latex Code",
    code: `
\\documentclass[a4paper,10pt]{article}
%-----------------------------------------------------------
\\usepackage[top=0.75in, bottom=0.75in, left=0.55in, right=0.85in]{geometry}
\\usepackage{graphicx}
\\usepackage{url}
\\usepackage{palatino}
\\usepackage{tabularx}
\\fontfamily{SansSerif}
\\selectfont

\\usepackage[T1]{fontenc}
\\usepackage[utf8]{inputenc}

\\usepackage{color}
\\definecolor{mygrey}{gray}{0.75}
\\textheight=9.75in
\\raggedbottom

\\setlength{\\tabcolsep}{0in}
\\newcommand{\\isep}{-2 pt}
\\newcommand{\\lsep}{-0.5cm}
\\newcommand{\\psep}{-0.6cm}
\\renewcommand{\\labelitemii}{$\\circ$}

\\pagestyle{empty}
%-----------------------------------------------------------
%Custom commands
\\newcommand{\\resitem}[1]{\\item #1 \\vspace{-2pt}}
\\newcommand{\\resheading}[1]{{\\small \\colorbox{mygrey}{\\begin{minipage}{0.975\\textwidth}{\\textbf{#1 \\vphantom{p\\^{E}}}}\\end{minipage}}}}
\\newcommand{\\ressubheading}[3]{
\\begin{tabular*}{6.62in}{l @ {\\extracolsep{\\fill}} r}
\\textsc{{\\textbf{#1}}} & \\textsc{\\textit{[#2]}} \\\\
\\end{tabular*}\\vspace{-8pt}}
%-----------------------------------------------------------

\\begin{document}
\\hspace{0.5cm}\\\\[-0.2cm]

\\textbf{KUNAL KANDHARI} \\\\
\\indent Email-id : \\textbf{kunal.kandhari27@gmail.com} \\\\
\\indent Mobile No.: \\textbf{8504815027} \\\\
\\indent Alt Mob No.: \\textbf{8529519320} \\\\

\\resheading{\\textbf{ACADEMIC DETAILS}}\\\\[\\lsep]
\\\\ \\\\
\\indent \\begin{tabular}{ l @ {\\hskip 0.15in} l @ {\\hskip 0.15in} l @ {\\hskip 0.15in} l @ {\\hskip 0.15in} l }
\\hline
\\textbf{Degree} & \\textbf{stream} & \\textbf{Institute} & \\textbf{year} & \\textbf{\\%age or CGPA} \\\\
\\hline
B.Tech & \\textit{Electrical Engineering} &
M.B.M Enginering College, JODHPUR & 2019 & 7.15\\\\
12th & \\textit{Maths} &
Lawerence and Mayo Public School, KOTA & 2015 & 78.2\\\\
10th & \\textit{NA} &
Lawerence and Mayo Public School, KOTA & 2013 & 9.6\\\\
\\hline
\\end{tabular}
\\\\ \\\\

\\resheading{\\textbf{SCHOLASTIC ACHIEVEMENTS}}\\\\[\\lsep]
\\begin{itemize}
\\item \\noindent \\textbf Secured All India Rank 1408 in GATE - 2019 among 112,097 candidates,
\\item \\noindent \\textbf Secured All India Rank 9403 in JEE-Advanced ’15 among 150,000 candidates,
\\item \\noindent \\textbf Secured 98.96 percentile in JEE-Mains ’15 among 1,400,000 candidates.
\\end{itemize}

\\resheading{\\textbf{TECHNICAL SKILLS}}\\\\[\\lsep]
\\begin{itemize}
\\item \\noindent \\textbf Circuit Analysis,
\\item \\noindent \\textbf{Circuit simulation tools} (PSPICE, Simulink),
\\item \\noindent \\textbf Programming Languages (C, Core Java)
\\end{itemize}

\\resheading{\\textbf{Personal Strength}}\\\\[\\lsep]
\\begin{itemize}
\\item \\noindent \\textbf Strong Inter-personal - organization skills,
\\item \\noindent \\textbf Able to cope under pressure,
\\item \\noindent \\textbf Good communication skills,
\\item \\noindent \\textbf Can work independently or as a part of a team.
\\end{itemize}

\\resheading{\\textbf{Projects}}\\\\[\\lsep]
\\begin{itemize}
\\item \\textbf{Microcontroller based bidirectional buck-boost converter for photo-voltaic power plant}\\\\[-0.6cm]
\\begin{itemize}\\itemsep \\isep
\\item \\textbf{Objective}: To design a bidirectional converter and a suitable control scheme to take care of transition, from buck to boost and boost to buck mode automatically based on source voltage.
\\end{itemize}
\\end{itemize}

\\resheading{\\textbf{Summer Training}}\\\\[\\lsep]
\\begin{itemize}
\\item \\noindent At BEL, GHAZIABAD on 'STUDY OF POWER SYSTEM OF BEL'.
\\item \\noindent At DRDO, JODHPUR on 'STUDY OF DUST EXPOSURE CHAMBER'.
\\end{itemize}

\\resheading{\\textbf{Position of Responsibility}}\\\\[\\lsep]
\\begin{itemize}
\\item \\noindent Team leader of robotics team in ESRC Robotics competition, CSE department (M.B.M,Jodhpur).
\\item \\noindent Part of an initiative VISION (a compaign to clean our college campus).
\\item \\noindent Member of organizing committee of Espectro, Annual cultural fest of M.B.M Engineering college,Jodhpur.
\\end{itemize}

\\resheading{\\textbf{FIELDS OF INTEREST}}\\\\[\\lsep]
\\begin{itemize}
\\item \\noindent Competitive Coding,
\\item \\noindent Data structures and algorithm.
\\end{itemize}

\\resheading{\\textbf{Extra Curricular Activities}}\\\\[\\lsep]
\\begin{itemize}
\\item \\noindent Active participation in Badminton Competitions,
\\item \\noindent Puzzle solving.
\\end{itemize}

\\end{document}
`
  },
};

export const ResumeTemplates: React.FC = () => {
    const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

    const handleViewClick = (templateKey: string) => {
        setSelectedTemplate(templateKey);
    };

    const handleClose = () => {
        setSelectedTemplate(null);
    };

    const currentTemplate = selectedTemplate ? templates[selectedTemplate] : null;

    return (
        <>
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">📄 Resume Templates</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
                    Use the <strong>“View Code”</strong> button to access the LaTeX code. Copy the code and visit <a href="https://overleaf.com" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">Overleaf</a> to create a new project, paste the code, and customize it.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Object.keys(templates).map((key) => (
                         <div key={key} className="template-card border border-slate-200 dark:border-slate-700 rounded-lg p-4 flex flex-col items-center text-center transition-all hover:shadow-md hover:border-primary-300 dark:hover:border-primary-600">
                            <FileText className="w-12 h-12 text-primary-500 mb-3" />
                            <h4 className="font-semibold text-slate-800 dark:text-slate-200 flex-grow mb-3">{templates[key].name}</h4>
                            <button 
                                onClick={() => handleViewClick(key)} 
                                className="mt-auto text-sm bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300 font-medium px-4 py-1.5 rounded-full hover:bg-primary-200 dark:hover:bg-primary-800/50 transition-colors"
                            >
                                View Code
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal */}
            {currentTemplate && (
                <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50 animate-fade-in" onClick={handleClose}>
                    <div className="bg-white dark:bg-slate-900 rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
                        <div className="flex justify-between items-center p-4 border-b border-slate-200 dark:border-slate-700 flex-shrink-0">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white">{currentTemplate.title}</h3>
                            <button onClick={handleClose} className="text-slate-500 hover:text-slate-800 dark:hover:text-slate-200" aria-label="Close">
                                <X size={24} />
                            </button>
                        </div>
                        <div className="p-4 overflow-y-auto">
                            <pre className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg text-xs whitespace-pre-wrap break-words font-mono">{currentTemplate.code.trim()}</pre>
                        </div>
                        <div className="p-4 border-t border-slate-200 dark:border-slate-700 text-right flex-shrink-0">
                            <button onClick={handleClose} className="bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 px-4 py-2 rounded-lg font-semibold text-sm hover:bg-slate-300 dark:hover:bg-slate-600">Close</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
