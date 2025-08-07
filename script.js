const overviewEditor = new Quill('#overview', { theme: 'snow' });
const guidelinesEditor = new Quill('#guidelines', { theme: 'snow' });
const rubricEditor = new Quill('#rubric', { theme: 'snow' });
const technicalSupportEditor = new Quill('#technical-support', { theme: 'snow' });

const rubricCheckbox = document.getElementById('edit-rubric');
const rubricSection = document.getElementById('rubric-section');
rubricEditor.enable(rubricCheckbox.checked);
rubricSection.style.display = 'none';

rubricCheckbox.addEventListener('change', function () {
    rubricSection.style.display = this.checked ? 'block' : 'none';
    rubricEditor.enable(this.checked);
});

const technicalSupportCheckbox = document.getElementById('edit-technical-support');
const technicalSupportSection = document.getElementById('technical-support-section');
technicalSupportEditor.enable(false);
technicalSupportSection.style.display = 'none';

technicalSupportCheckbox.addEventListener('change', function () {
    technicalSupportSection.style.display = this.checked ? 'block' : 'none';
    technicalSupportEditor.enable(this.checked);
});

async function copyToClipboard() {
    const module = document.getElementById('module').value;
    const type = document.getElementById('type').value;
    const title = document.getElementById('title').value;
    const overview = overviewEditor.root.innerHTML.trim();
    const guidelines = guidelinesEditor.root.innerHTML.trim();

    const rubricEdited = document.getElementById('edit-rubric').checked;
    const rubric = rubricEdited ? rubricEditor.root.innerHTML.trim() : '<p>See below for the rubric associated with this assignment.</p>';
    
    const technicalSupportEdited = document.getElementById('edit-technical-support').checked;
    const technical_support = technicalSupportEdited ? technicalSupportEditor.root.innerHTML.trim() : `
        <p>Need help using Canvas Assignments? If so, please review the following guide:</p>
        <p><a class="inline_disabled" href="https://community.canvaslms.com/t5/Student-Guide/tkb-p/student#Assignments" target="_blank" rel="noopener">Canvas Student Guide - Assignments</a></p>
    `;

    const prompt = '<p>Test Prompt<p>';
    const instructions = '<p>Test Instructions<p>';
    const readings = '<p>Test Readings<p>';
    const videos = '<p>Test Videos<p>';
    const interactive_lesson = '<p>Test Interactive Lesson<p>';
    const cohort_session = '<p>Test Cohort Session<p>';
    const todo = '<p>Test To-Do<p>';

    try {
        const templateFile = document.getElementById('template').value;
        const response = await fetch(templateFile);
        let template = await response.text();

        template = template
            .replace(/\${module}/g, module)
            .replace(/\${type}/g, type)
            .replace(/\${title}/g, title)
            .replace(/\${overview}/g, overview)
            .replace(/\${guidelines}/g, guidelines)
            .replace(/\${rubric}/g, rubric)
            .replace(/\${technicalSupport}/g, technical_support)
            .replace(/\${prompt}/g, prompt)
            .replace(/\${instructions}/g, instructions)
            .replace(/\${readings}/g, readings)
            .replace(/\${videos}/g, videos)
            .replace(/\${interactive_lesson}/g, interactive_lesson)
            .replace(/\${cohort_session}/g, cohort_session)
            .replace(/\${todo}/g, todo);

        navigator.clipboard.writeText(template)
            .then(() => alert('Copied to clipboard.'))
            .catch(err => alert('Failed to copy: ' + err));
    } catch (err) {
        console.error('Error loading template:', err);
        alert('Template loading failed.');
    }
}