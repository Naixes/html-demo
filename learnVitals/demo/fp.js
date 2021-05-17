const observer = new PerformanceObserver((list) => {
    for(const entry of list.getEntries()) {
        // duration
        console.log(entry);
    }
})

observer.observe({
    entryTypes: ['paint']
})