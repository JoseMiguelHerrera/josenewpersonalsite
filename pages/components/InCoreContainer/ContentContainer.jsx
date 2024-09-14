import styles from '../../../styles/Home.module.css';
import ContentBox from './ContentBox';
export default function ContentContainer(props) {

    const content = props.menuData[props.selectedId];


    const entries = [
        {
            title: "Entry 1",
            startDate: "April 2023",
            paragraph: "This is the first entry about a new project kickoff.",
            link: "https://example.com/entry1"
        },
        {
            title: "Entry 2",
            startDate: "April 2023",
            endDate: "April 2023",
            paragraph: "Progress update on the ongoing development phase.",
            link: "https://example.com/entry2"
        },
        {
            title: "Entry 3",
            startDate: "April 2023",
            paragraph: "Team collaboration session for brainstorming ideas.",
        },
        {
            title: "Entry 4",
            startDate: "May 2023",
            endDate: "May 2023",
            paragraph: "Milestone achieved: Beta version released for testing.",
            link: "https://example.com/entry4"
        },
        {
            title: "Entry 5",
            startDate: "May 2023",
            paragraph: "User feedback collection and analysis session.",
        },
        {
            title: "Entry 6",
            startDate: "May 2023",
            endDate: "May 2023",
            paragraph: "Implementation of new features based on user feedback.",
            link: "https://example.com/entry6"
        },
        {
            title: "Entry 7",
            startDate: "May 2023",
            endDate: "May 2023",
            paragraph: "Quality assurance and bug fixing sprint.",
        },
        {
            title: "Entry 8",
            startDate: "May 2023",
            paragraph: "Final review meeting before the product launch.",
            link: "https://example.com/entry8"
        },
        {
            title: "Entry 9",
            startDate: "June 2023",
            paragraph: "Official product launch and celebration.",
        },
        {
            title: "Entry 10",
            startDate: "June 2023",
            endDate: "June 2023",
            paragraph: "Post-launch review and future planning session.",
            link: "https://example.com/entry10"
        }
    ]

    return (
        
        <div className={styles.ContentContainer}>
            <ContentBox menuName={content.menuName} entries={entries}></ContentBox>
        </div>
    )
}
