import { save_form } from "./utils/leads";

function tagManager (eventName) {
    console.log(window.dataLayer);
    if (typeof dataLayer != 'undefined') {
        dataLayer.push({'event': eventName});
        console.log('Event successfully triggered: ' + eventName);
    }
    else console.log('TagManager:dataLayer not found to trigger event ' + eventName);
}

export const apply = async (data, session) => {
    console.log("Apply action called with session: ", session);
    tagManager('student_application');
    let body = {};
    for (let key in data) body[key] = data[key].value;

    console.log("session", session);
    return await save_form(body, ['website-lead'], ['hard'], session);

    throw Error('Unexpected error');
}

export const requestSyllabus = async (data,session) => {
    console.log("Succesfully requested Syllabus", data)
    let body = {};
    for (let key in data) body[key] = data[key].value;

    console.log("session", session);
    return await save_form(body, ['request_more_info'], ['soft'], session);
    // return fetch('/api/acp_apply', {
    //     headers: new Headers({'content-type': 'application/json'}),
    //     method: "POST",
    //     body: JSON.stringify({ ...data, tags: ['syllabus_request'] }),
    // })
    //     .then(resp => {
    //         if( resp.status >= 200 && resp.status < 400) return resp.json();
    //         throw Error('Unexpected error');
    //     });
}
export const reviewGuidebook = async (data,session) => {
    console.log("Succesfully requested Guidebook", data)
    let body = {};
    for (let key in data) body[key] = data[key].value;

    console.log("session", session);
    return await save_form(body, ['download-guidebook'], ['soft'], session);
    // return fetch('/api/acp_apply', {
    //     headers: new Headers({'content-type': 'application/json'}),
    //     method: "POST",
    //     body: JSON.stringify({ ...data, tags: ['review_guidebook'] }),
    // })
    //     .then(resp => {
    //         if( resp.status >= 200 && resp.status < 400) return resp.json();
    //         throw Error('Unexpected error');
    //     });
}
export const beHiringPartner = async (data,session) => {
    console.log("Succesfully requested Be Hiring Partner", data);
    let body = {};
    for (let key in data) body[key] = data[key].value;

    console.log("session", session);
    return await save_form(body, ['hiring-partner'], ['soft'], session);
    
}
export const contactUs = async (data,session) => {
    console.log("Succesfully contact us", data)
    let body = {};
    for (let key in data) body[key] = data[key].value;

    console.log("session", session);
    return await save_form(body, ['contact us'], ['soft'], session);
    // console.log("session", session);
    // return await save_form(body, ['contact us'], ['soft'], session)
}