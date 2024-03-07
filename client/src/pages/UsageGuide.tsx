import React, {useLayoutEffect} from 'react'
import LandingNavbar from '../components/LandingNavbar.tsx'
import Footer from '../components/Footer.tsx'

const UsageGuide: React.FC = () => {

    useLayoutEffect(() => {
        window.scrollTo(0, 0)
        document.title = `UIGrades | Usage Guide` 
    }, [])

    return (
        <div className="w-full flex justify-center items-center flex-col relative min-h-screen bg-dark">
        <LandingNavbar />
            <div className='md:mt-0 mt-8 flex flex-col items-start justify-center gap-10 min-h-screen w-5/6 md:text-justify text-zinc-300 leading-relaxed px-12'>
                <h1 className='md:text-5xl text-3xl text-primary font-bold underline-offset-[10px] underline'>Disclaimer</h1>
                <p className='text-lg md:text-2xl'>UIGrades is an objective data-based tool for students to visualize past semester courses’ grade distributions at the University of Iowa. If you’re using UIGrades to select classes to take, please use it in conjunction with <a href="https://myui.uiowa.edu/my-ui/home.page" target='_blank' className='text-primary'>MyUI</a>. Grade distributions are not necessarily an indicator of course difficulty nor a reflection on the instructor or department rewarding those grades. There are several factors that determine the ultimate grade distribution of a course, difficulty being only one. Additionally, UIGrades is not a substitute for an advising appointment. Please see your <a href="https://advisingcenter.uiowa.edu/contact" target='_blank' className='text-primary'>designated academic advisor</a> for questions about your proposed course schedule.</p>
                <h1 className='md:text-5xl text-3xl text-primary font-bold underline-offset-[10px] underline'>Helpful Resources</h1>
                <ul className='list-disc list-inside text-lg md:text-2xl text-zinc-300'>
                    <li><a href="https://myui.uiowa.edu/my-ui/home.page" target='_blank' className='hover:text-primary transition duration-500'>MyUI</a></li>
                    <li><a href="https://advisingcenter.uiowa.edu/contact" target='_blank' className='hover:text-primary transition duration-500'>Academic Advising</a></li>
                    <li><a href="https://registrar.uiowa.edu/academic-calendar" target='_blank' className='hover:text-primary transition duration-500'>Academic Calendar</a></li>
                    <li><a href="https://www.uiowa.edu/students" target='_blank' className='hover:text-primary transition duration-500'>Student Resources</a></li>
                </ul>
            </div>
        <Footer />
        </div>
    );
}

export default UsageGuide