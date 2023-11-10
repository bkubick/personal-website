import React from 'react';

import { Education } from 'src/interface/education';
import { Project } from 'src/interface/project';
import { User } from 'src/interface/user';
import { WorkExperience } from 'src/interface/work-experience';
import { user, education, projects, workExperiences } from 'src/professional-info';
import DetailsFrame from './DetailsFrame';
import SummaryFrame from './SummaryFrame';


interface Props {}


interface State {
    user: User;
    workExperiences: WorkExperience[];
    projects: Project[];
    education: Education[];
    activeSection: string;
}


class PersonalPortfolio extends React.Component<Props, State> {

    sections: string[] = [
        'about',
        'experience',
        'background',
        'personal'
    ];

    constructor(props: Props) {
        super(props);
        this.state = {
            user: user,
            workExperiences: workExperiences,
            projects: projects,
            education: education,
            activeSection: this.sections[0],
        }

        this.updateActiveSection = this.updateActiveSection.bind(this);
    }

    componentDidMount(): void {
        this.addNavbarSectionScrollListener();
    }

    updateActiveSection(section: string): void {
        this.setState({ activeSection: section });
    }

    addNavbarSectionScrollListener(): void {
        const detailsFrame: HTMLElement | null = document.getElementById('details-frame');
        const experienceSection: HTMLElement | null = document.getElementById('experience');
        const educationSection: HTMLElement | null = document.getElementById('background');
        const projectSection: HTMLElement | null = document.getElementById('personal');

        const scrollHandler = () => {
            if (!(detailsFrame && projectSection && educationSection && experienceSection)) {
                throw Error('Element section missing.');
            }

            if (detailsFrame.scrollTop >= projectSection.offsetTop) {
                this.updateActiveSection('personal');
            } else if (detailsFrame.scrollTop < projectSection.offsetTop && detailsFrame.scrollTop >= educationSection.offsetTop) {
                this.updateActiveSection('background');
            } else if (detailsFrame.scrollTop < educationSection.offsetTop && detailsFrame.scrollTop >= experienceSection.offsetTop) {
                this.updateActiveSection('experience');
            } else {
                this.updateActiveSection('about');
            }
        };

        detailsFrame?.addEventListener('scroll', scrollHandler);
    }

    render() {
        return (
            <div id='app' className='container mx-auto h-screen flex'>
                <div className='grid lg:grid-cols-5'>
                    <div className='col-span-2 lg:overflow-hidden flex'>
                        <div className='overflow-y-scroll no-scrollbar'>
                            <SummaryFrame user={ this.state.user } activeSection={this.state.activeSection} sections={this.sections} classNames='lg:h-screen'></SummaryFrame>
                        </div>
                    </div>
                    <div className='col-span-3 lg:overflow-hidden flex'>
                        <div id="details-frame" className='overflow-y-scroll no-scrollbar'>
                            <DetailsFrame
                                user={ this.state.user }
                                workExperiences={ this.state.workExperiences }
                                projects={ this.state.projects }
                                education={ this.state.education }></DetailsFrame>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default PersonalPortfolio;