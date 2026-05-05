# 10th MH Board Curriculum Study App

## Overview   

This Learning Dashboard now includes a complete **10th MH (Maharashtra) Board Curriculum** with subject-wise topic breakdown, marks allocation, and importance indicators.

## Features Added

### 1. **Curriculum Data (curriculum-10-mh.js)**
- Complete breakdown of all subjects for Class 10 MH Board
- Topics with marks weightage and descriptions
- Importance indicators (⭐) for high-priority topics

### 2. **Subjects Covered**

#### Science 2 (Biology) — 40 marks
- Life Processes in Living Organisms (6-7 marks) ⭐
- Heredity & Evolution (6-7 marks) ⭐
- Cell Biology & Biotechnology (5-6 marks)
- Introduction to Microbiology (5-6 marks)
- Animal Classification (4-5 marks)
- Environmental Management (3-4 marks)
- Social Health (2-3 marks)
- Towards Green Energy (2-3 marks)

#### Maths 1 (Algebra) — 40 marks
- Linear Equations (5-6 marks)
- Quadratic Equations (6-7 marks) ⭐
- Arithmetic Progression (5-6 marks) ⭐
- Financial Planning (4-5 marks)
- Statistics (6-7 marks) ⭐
- Probability (5-6 marks)

#### Maths 2 (Geometry) — 40 marks
- Similarity (6-7 marks) ⭐
- Pythagoras Theorem (3-4 marks)
- Circle (5-6 marks)
- Constructions (2-3 marks)
- Coordinate Geometry (5-6 marks)
- Trigonometry (6-7 marks) ⭐
- Mensuration (5-6 marks)

#### History — 20 marks
- Applied History (4-5 marks) ⭐
- Heritage Management (3-4 marks) ⭐
- Mass Media & History (2-3 marks)
- Entertainment & History (2-3 marks)
- History of Indian Arts (2-3 marks)
- Tourism & History (2-3 marks)
- Sports & History (1-2 marks)
- Historiography (West + Indian) (2-3 marks)

#### Civics — 20 marks
- Working of the Constitution (5-6 marks) ⭐
- Political Parties (4-5 marks) ⭐
- Social & Political Movements (3-4 marks)
- Challenges to Democracy (3-4 marks)
- Public Facilities (2-3 marks)

#### Geography — 20 marks
- Climate (4-5 marks) ⭐
- Physiography & Drainage (3-4 marks) ⭐
- Population (3-4 marks)
- Natural Vegetation & Wildlife (2-3 marks)
- Economy & Occupations (2-3 marks)
- Transport & Communication (2-3 marks)
- Location & Extent (1-2 marks)
- Settlements (1-2 marks)
- Field Visit (1-2 marks)

#### Economics — 20 marks
- Sectors of the Economy (5-6 marks) ⭐
- Globalisation (4-5 marks) ⭐
- Development Experience of India (3-4 marks)
- Money & Credit (3-4 marks)
- Consumer Rights (2-3 marks)

### 3. **User Interface**

#### Quick Access Card
A new "SYLLABUS" card in the Quick Access section that opens the curriculum view.

#### Expandable Curriculum View
- Click on any subject to expand and view all topics
- Each topic shows:
  - Topic name with importance indicator (⭐)
  - Description of the topic
  - Marks weightage
  - Highlighted background for important topics

#### Visual Design
- Color-coded by subject for easy identification
- Smooth animations for expand/collapse
- Dark theme consistent with the rest of the app
- Responsive layout for mobile viewing

## How to Use

1. **Complete Onboarding**: Select "MH Board" and "Class 10"
2. **Access Curriculum**: Click on the "SYLLABUS" card in Quick Access
3. **Browse Topics**: Click on any subject card to expand/collapse the topics
4. **Review Details**: Each topic shows its marks, description, and importance level

## File Structure

```
edu-app/
├── index.html               # Main HTML file
├── styles.css              # All styling (including curriculum styles)
├── curriculum-10-mh.js     # 10th MH curriculum data
```

## Styling Classes

### Curriculum Components
- `.curriculum-container` - Main container for all subjects
- `.curriculum-subject-card` - Individual subject card
- `.subject-header` - Header with subject name and marks
- `.topics-list` - Container for topics (expandable)
- `.topic-item` - Individual topic item
- `.topic-item.important-topic` - Highlighted important topics
- `.marks-badge` - Marks display badge

## JavaScript Functions

### From curriculum-10-mh.js

- `renderCurriculumView()` - Renders the entire curriculum view
- `toggleSubjectTopics(subject, element)` - Toggles expand/collapse of topics
- `curriculum10MH` - Data object containing all subjects and topics

## Total Marks Distribution

- **Science 2 (Biology)**: 40 marks
- **Maths 1 (Algebra)**: 40 marks
- **Maths 2 (Geometry)**: 40 marks
- **History**: 20 marks
- **Civics**: 20 marks
- **Geography**: 20 marks
- **Economics**: 20 marks
- **Total**: 200 marks

## Future Enhancements

- [ ] Progress tracking for each topic
- [ ] Practice questions linked to topics
- [ ] Chapter-wise detailed content
- [ ] Downloadable syllabus PDF
- [ ] Note-taking feature
- [ ] Study schedule planner
- [ ] Mock tests by subject/topic
- [ ] Performance analytics

## Notes

- The curriculum is specifically for **Class 10 - MH Board**
- Important topics (⭐) are prioritized based on typical board exam patterns
- Marks allocation is based on official MH Board guidelines
- Regular updates available for latest syllabus changes
