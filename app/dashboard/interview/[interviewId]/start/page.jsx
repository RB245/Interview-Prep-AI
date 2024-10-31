"use client";
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react';
import QuestionsSection from './_ components/QuestionsSection';
import RecordAnsSection from './_ components/RecordAnsSection';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

function StartInterview({ params }) {
    const [interviewData, setInterviewData] = useState(null);
    const [interviewId, setInterviewId] = useState();
    const [mockInterviewQuestions, setMockInterviewQuestions] = useState(null);
    const [activeQuestionIndex,setActiveQuestionIndex] =useState(0);

    useEffect(() => {
        async function unwrapParams() {
            const resolvedParams = await params;
            setInterviewId(resolvedParams.interviewId);
        }
        unwrapParams();
    }, [params]);

    useEffect(() => {
        if (interviewId) {
            const GetInterviewDetails = async () => {
                const result = await db
                    .select()
                    .from(MockInterview)
                    .where(eq(MockInterview.mockId, interviewId));

                setInterviewData(result[0]);

                // Parse the jsonMockResp and set the questions array
                const jsonMockResp = JSON.parse(result[0].jsonMockResp);
                setMockInterviewQuestions(jsonMockResp.questions);

                // Log the entire array of questions
                console.log("Questions array:", jsonMockResp.questions);
            };

            GetInterviewDetails();
        }
    }, [interviewId]);

    return (
        <div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
                {/* Questions */}
                <QuestionsSection  
                mockInterviewQuestions={mockInterviewQuestions}
                activeQuestionIndex={activeQuestionIndex}
                />
                {/* Video/ Audio Recording */}
                <RecordAnsSection
                mockInterviewQuestions={mockInterviewQuestions}
                activeQuestionIndex={activeQuestionIndex}
                interviewData={interviewData}
                />
            </div>
            <div className='flex justify-end gap-6'>
                {activeQuestionIndex>0&& 
                <Button onClick={()=>setActiveQuestionIndex(activeQuestionIndex-1)}>Previous Question</Button>}
                {activeQuestionIndex!= mockInterviewQuestions?.lengt-1&& 
                <Button onClick={()=>setActiveQuestionIndex(activeQuestionIndex+1)}>Next Question</Button>}
                {activeQuestionIndex==mockInterviewQuestions?.length-1&& 
                <Link href={'/dashboard/interview/'+interviewData?.mockId+'/feedback'}>
                <Button>End Interview</Button>
                </Link>}
            </div>
        </div>
    );
}

export default StartInterview;
