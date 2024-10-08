// utils/parseCourseContent.js

export function parseCourseContent(content) {
    const lines = content.split('\r\n');
    const modules = [];
    let currentModule = null;

    lines.forEach((line) => {
        if (line.startsWith('Module')) {
            // Extract module number and title
            const moduleMatch = line.match(/Module\s*–\s*(\d+)\s*(.*)/);
            if (moduleMatch) {
                const moduleNumber = moduleMatch[1];
                const moduleTitle = moduleMatch[2];
                currentModule = {
                    id: modules.length + 1,
                    title: `Module ${moduleNumber}: ${moduleTitle}`,
                    lessons: [],
                };
                modules.push(currentModule);
            }
        } else if (line.startsWith('- ') && currentModule) {
            const lessonTitle = line.substring(2).trim();
            currentModule.lessons.push({
                id: currentModule.lessons.length + 1,
                title: lessonTitle,
                duration: Math.floor(Math.random() * 10) + 5, // Placeholder for duration
            });
        }
    });

    return modules;
}
