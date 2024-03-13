import React, { useEffect, useRef } from "react";

export default function PromptInfoModal({setShowPromptInfo}: {setShowPromptInfo: any}) {

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            const modal = document.getElementById("promptInfoModal");

            // Check if the click is outside the modal
            if (modal && !modal.contains(event.target as Node)) {
                setShowPromptInfo(false);
            }
        };

        // Add event listener when the component mounts
        document.addEventListener("mousedown", handleOutsideClick);

        // Clean up the event listener when the component unmounts
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, [setShowPromptInfo]);

    return (
        <div className="w-full h-full absolute top-0 left-0 z-40 darker-blurred-container cursor-pointer z-[100]">
        <div id="promptInfoModal" className="text-zinc-300 flex justify-center items-center absolute left-[5%] md:left-[25%] top-[10%] md:top-[25%] w-11/12 md:w-1/2 flex-col gap-8 rounded-2xl z-50 p-10">
            <h1 className="text-[2rem] w-full text-start text-primary">Data Disclaimer</h1>
            <p className="text-[1rem] w-full text-start leading-loose opacity-80 whitespace-break-spaces font-extralight">
                This data may look different from previous iterations of the Fall 2022, Winter 2023, and Spring 2023 semesters.
                <br/>
                <br/>
                Due to changes in administrative oversight, we are not currently able to display the data in the same format. This may be a permanent change; however, we are working with administration to provide the student body with the most informative and student-conscious data possible. 
                <br/>
                <br/>
                If you have any questions, please contact Quinn Eldridge, Liao Zhu, or <a className="text-primary" href="mailto:USG-academicaffairs@uiowa.edu" target="_blank">USG-academicaffairs@uiowa.edu</a>. Thank you! 
            </p>
            <p className="text-xs text-center opacity-80 italic font-thin">Click anywhere outside to close</p>
        </div>
        </div>
    );
}