import React, { useState, useEffect } from 'react';
import { Menu, Terminal, X } from 'lucide-react';

const formatCode = (code) => {
  return code
    .split(';')
    .map(line => line.trim())
    .filter(line => line.length > 0)
    .map(line => {
      if (line.startsWith('import ')) {
        return `${line};`;
      }
      if (line.includes('{') && !line.includes('}')) {
        return `${line};`;
      }
      const indentLevel = (line.match(/{/g) || []).length - (line.match(/}/g) || []).length;
      const indent = '  '.repeat(Math.max(0, indentLevel));
      return `${indent}${line};`;
    })
    .join('\n');
};

const TerminalCodeBlock = ({ code, language = 'bash' }) => {
  const formattedCode = formatCode(code);
  
  return (
    <div className="my-6 bg-neutral-800 rounded-lg overflow-hidden shadow-lg">
      <div className="bg-neutral-700 px-4 py-2 flex items-center">
        <div className="flex gap-2 mr-4">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
          <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
        </div>
        <div className="flex items-center text-neutral-99 text-bodyextr">
          <Terminal size={14} className="mr-2" />
          <span>terminal</span>
        </div>
      </div>
      
      <div className="p-4 font-mono text-bodyextr">
        <div className="flex items-start">
          <span className="text-primary mr-2">$</span>
          <pre className="text-neutral-99 overflow-x-auto whitespace-pre">
            <code>{formattedCode}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};

const parseBlogContent = (htmlContent) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlContent, 'text/html');
  const sections = [];
  let currentSection = null;

  const isHeading = (node) => {
    return ['H1', 'H2', 'H3', 'H4', 'H5', 'H6'].includes(node.tagName);
  };

  const isCodeBlock = (node) => {
    return node.tagName === 'CODE' || node.tagName === 'PRE';
  };

  const isList = (node) => {
    return ['UL', 'OL'].includes(node.tagName);
  };

  const processNode = (node) => {
    if (isCodeBlock(node)) {
      return {
        type: 'code',
        content: node.textContent,
        language: node.getAttribute('data-language') || 'bash'
      };
    }
    
    if (isList(node)) {
      return {
        type: 'list',
        content: node.outerHTML,
        listType: node.tagName.toLowerCase()
      };
    }
    
    return {
      type: 'html',
      content: node.outerHTML
    };
  };

  const createSection = (title) => {
    if (currentSection) {
      sections.push(currentSection);
    }
    currentSection = {
      id: title.toLowerCase().replace(/\s+/g, '-'),
      title: title.trim(),
      content: []
    };
  };

  doc.body.childNodes.forEach((node) => {
    if (node.nodeType === Node.ELEMENT_NODE) {
      if (isHeading(node)) {
        createSection(node.textContent);
      } else if (node.tagName === 'P' && node.querySelector('strong')) {
        const strongText = node.querySelector('strong').textContent;
        createSection(strongText);
      } else if (currentSection) {
        currentSection.content.push(processNode(node));
      } else {
        currentSection = {
          id: 'introduction',
          title: 'Introduction',
          content: [processNode(node)]
        };
      }
    }
  });

  if (currentSection) {
    sections.push(currentSection);
  }

  return sections;
};

const RenderIndividualBlog = ({ blogData }) => {
  const [activeSection, setActiveSection] = useState('');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [sections, setSections] = useState([]);

  useEffect(() => {
    setSections(parseBlogContent(blogData.content));
  }, [blogData.content]);

  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setScrollProgress(scrolled);

      const sectionElements = document.querySelectorAll('section');
      sectionElements.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top >= 0 && rect.top <= window.innerHeight / 2) {
          setActiveSection(section.id);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const renderContent = (content) => {
    if (content.type === 'code') {
      return <TerminalCodeBlock code={content.content} language={content.language} />;
    }
    
    if (content.type === 'list') {
      return (
        <div 
          dangerouslySetInnerHTML={{ __html: content.content }} 
          className="prose-content prose-lists"
        />
      );
    }
    
    return (
      <div 
        dangerouslySetInnerHTML={{ __html: content.content }} 
        className="prose-content"
      />
    );
  };

  const customStyles = `
    .prose-content {
      line-height: 1.7;
      color: #fff;
    }
    
    .prose-content > * {
      margin-bottom: 1.5rem;
    }
    
    .prose-content > *:last-child {
      margin-bottom: 0;
    }
    
    .prose-content p {
      margin-bottom: 1.5rem;
      line-height: 1.7;
    }
    
    .text-node > span {
      line-height: 1.7;
      color: #fff !important;
    }

    .prose-content p:last-child {
      margin-bottom: 0;
    }
    
    .prose-content strong {
      font-weight: 600;
      color: #1f2937;
    }
    
    .prose-content p strong:first-child {
      display: inline-block;
      margin-top: 1rem;
    }
    
    .prose-content ul, .prose-content ol {
      margin-bottom: 1.5rem;
      line-height: 1.7;
      padding-left: 1.5rem;
    }
    
    .prose-content ul {
      list-style-type: disc;
    }
    
    .prose-content ol {
      list-style-type: decimal;
    }
    
    .prose-content ul ul {
      list-style-type: circle;
      margin-top: 0.5rem;
      margin-bottom: 0.5rem;
    }
    
    .prose-content ol ol {
      list-style-type: lower-alpha;
      margin-top: 0.5rem;
      margin-bottom: 0.5rem;
    }
    
    .prose-content ul ul ul {
      list-style-type: square;
    }
    
    .prose-content li {
      margin-bottom: 0.5rem;
      padding-left: 0.25rem;
    }
    
    .prose-content li:last-child {
      margin-bottom: 0;
    }
    
    .prose-content li > ul,
    .prose-content li > ol {
      margin-top: 0.5rem;
      margin-bottom: 0;
    }
    
    .prose-content li p {
      margin-bottom: 0.5rem;
    }
    
    .prose-content li p:last-child {
      margin-bottom: 0;
    }

    .prose-content h1, .prose-content h2, .prose-content h3,
    .prose-content h4, .prose-content h5, .prose-content h6 {
      margin-top: 2rem;
      margin-bottom: 1rem;
      font-weight: 600;
    }
    
    .prose-content blockquote {
      margin: 1.5rem 0;
      padding-left: 1rem;
      border-left: 4px solid #e5e7eb;
      font-style: italic;
    }
    
    .prose-content table {
      width: 100%;
      margin: 1.5rem 0;
      border-collapse: collapse;
    }
    
    .prose-content th,
    .prose-content td {
      padding: 0.75rem;
      border: 1px solid #e5e7eb;
      text-align: left;
    }
    
    .prose-content th {
      background-color: #f9fafb;
      font-weight: 600;
    }
  `;

  return (
    <div className="min-h-screen pt-9 bg-[#1a3e5c]">
      <style jsx>{customStyles}</style>
      
      <div 
        className="fixed top-0 left-0 h-1 bg-primary z-50" 
        style={{ width: `${scrollProgress}%` }}
      />
      
      <button
        className="fixed top-4 right-4 lg:hidden z-50 text-neutral-800 bg-white p-2 rounded-lg shadow-lg"
        onClick={() => setIsMenuOpen(true)}
      >
        <Menu size={24} />
      </button>
      
      <div className="max-w-7xl mx-auto pt-6 lg:px-8">
        <div className="lg:flex lg:gap-8">
          <aside className={` hidden lg:block lg:w-64 flex-none
            ${isMenuOpen ? 'fixed inset-0 z-40' : 'hidden'}
          `}>
            <div className="hidden lg:sticky lg:top-32 lg:h-[calc(100vh-1.5rem)]">
              <div className="bg-neutral-99 shadow-lg rounded-[32px] p-8">
                <div className="p-0">
                  {isMenuOpen && (
                    <button
                      className="lg:hidden absolute top-4 right-4 text-neutral-800"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <X size={24} />
                    </button>
                  )}
                  
                  <div className="h-[calc(100vh-8rem)] lg:h-[calc(100vh-10rem)] overflow-y-auto">
                    <nav className="space-y-4">
                      {sections.map((section) => (
                        <a
                          key={section.id}
                          href={`#${section.id}`}
                          onClick={() => setIsMenuOpen(false)}
                          className={`
                            block text-bodymed font-[500] transition-colors
                            ${activeSection === section.id 
                              ? 'text-primary' 
                              : 'text-neutral-500 hover:text-primary'}
                          `}
                        >
                          {section.title}
                        </a>
                      ))}
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </aside>
          
          <main className="flex-1">
            <div className="m-4 lg:m-0 bg-neutral-99 rounded-[32px] shadow-sm">
              <div className="p-8">
                <div className="flex items-center space-x-4 mb-8 pb-6 border-b border-gray-200">
                  {blogData.authorImage ? (
                    <img 
                      src={blogData.authorImage} 
                      alt={blogData.author}
                      className="w-16 h-16 rounded-full object-cover border-2 border-gray-300"
                    />
                  ) : (
                    <div className="bg-[#E9C46A] w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center font-semibold text-lg">
                      {blogData.author ? blogData.author.split(' ').map(n => n[0]).join('').toUpperCase() : 'A'}
                    </div>
                  )}
                  <div>
                    <h3 className="text-bodybold font-[600] text-neutral-800">{blogData.author}</h3>
                    <p className="text-bodysmal text-neutral-500">
                      Published on {new Date(blogData.publishDate).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric', 
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
                
                <div className="prose max-w-none">
                  {sections.map((section) => (
                    <section key={section.id} id={section.id} className="mb-16">
                      <h2 className="text-h5 lg:text-h4 font-[600] text-neutral-800 mb-8">
                        {section.title}
                      </h2>
                      <div className="space-y-8">
                        {section.content.map((content, index) => (
                          <div 
                            key={index}
                            className="text-bodymed text-[#fff] leading-relaxed"
                          >
                            {renderContent(content)}
                          </div>
                        ))}
                      </div>
                    </section>
                  ))}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default RenderIndividualBlog;