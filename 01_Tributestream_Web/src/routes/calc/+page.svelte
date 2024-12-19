<script>
    // We have a transcript where each page has exactly 25 lines: 1 through 25.
    // Redactions are given as intervals like: "1.5 - 1.10", which means from page 1, line 5 through line 10 should be removed.
    
    // Once we process all redactions, we find what is left (the "designations").
    // We then merge contiguous designations across page boundaries where possible.
    
    // This example provides a text input where the user can enter multiple redactions, one per line.
    // Example input:
    // 1.5 - 1.10
    // 2.1 - 2.5
    
    // Steps to solve:
    // 1) Parse the input redactions.
    // 2) Initialize a data structure representing each page and its lines (1-25).
    // 3) Apply redactions, removing those lines from each page.
    // 4) Determine remaining lines per page and form intervals.
    // 5) Merge intervals across page boundaries if the end of one page interval touches the start of another.
    // 6) Display the final intervals.
    
    // Utility function: parse a designation like "1.5 - 1.10" into {startPage:1, startLine:5, endPage:1, endLine:10}
    function parseRange(rangeStr) {
        // Expected format: "P.L - P.L"
        // Example: "1.5 - 1.10"
        // We will split by '-' and then parse each side.
        const parts = rangeStr.split('-').map(part => part.trim());
        if (parts.length !== 2) return null;
    
        const start = parts[0].split('.');
        const end = parts[1].split('.');
    
        if (start.length !== 2 || end.length !== 2) return null;
    
        const startPage = parseInt(start[0], 10);
        const startLine = parseInt(start[1], 10);
        const endPage = parseInt(end[0], 10);
        const endLine = parseInt(end[1], 10);
    
        if (isNaN(startPage) || isNaN(startLine) || isNaN(endPage) || isNaN(endLine)) {
            return null;
        }
    
        return { startPage, startLine, endPage, endLine };
    }
    
    // Check if two intervals (each defined as {startPage, startLine, endPage, endLine}) are contiguous.
    // Two intervals are contiguous if the second starts exactly after the first ends. For example:
    // Interval A: 1.11 - 1.25 and Interval B: 2.1 - 2.25 are contiguous because line 1.25 is followed by line 2.1.
    function areContiguous(a, b) {
        // To be contiguous, the end of 'a' and the start of 'b' must line up exactly:
        // If a ends at P1.L25 and b starts at P2.L1 and P2 == P1+1, then they are contiguous.
        // More generally:
        // The next line after (a.endPage, a.endLine) is either (a.endPage, a.endLine+1) if a.endLine < 25
        // or (a.endPage+1, 1) if a.endLine == 25.
        // If that "next line" equals (b.startPage, b.startLine), they are contiguous.
    
        let nextStartPage = a.endPage;
        let nextStartLine = a.endLine + 1;
        if (a.endLine === 25) {
            nextStartPage = a.endPage + 1;
            nextStartLine = 1;
        }
    
        return (nextStartPage === b.startPage && nextStartLine === b.startLine);
    }
    
    // Merge two contiguous intervals into one big interval
    function mergeIntervals(a, b) {
        return {
            startPage: a.startPage,
            startLine: a.startLine,
            endPage: b.endPage,
            endLine: b.endLine
        };
    }
    
    // Given redactions (array of {startPage, startLine, endPage, endLine}), compute final designations.
    function computeDesignations(redactions) {
        // 1) Determine the pages we need to consider. We'll consider all pages that appear in redactions or a default range.
        // However, since there's no maximum page stated, we can derive pages from redactions:
        let maxPage = 0;
        redactions.forEach(r => {
            if (r.startPage > maxPage) maxPage = r.startPage;
            if (r.endPage > maxPage) maxPage = r.endPage;
        });
    
        // Let's assume we must handle up to maxPage. If no redactions, we assume at least 1 page.
        if (maxPage === 0) maxPage = 1;
    
        // 2) Initialize pages: pagesData will be a map of page -> Set of available lines
        const pagesData = new Map();
        for (let p = 1; p <= maxPage; p++) {
            pagesData.set(p, new Set(Array.from({length:25}, (_,i)=>i+1)));
        }
    
        // 3) Apply redactions
        // For each redaction, remove lines from startPage.startLine to endPage.endLine inclusive
        redactions.forEach(r => {
            // If redaction starts and ends on the same page
            if (r.startPage === r.endPage) {
                const linesToRemove = [];
                for (let line = r.startLine; line <= r.endLine; line++) {
                    linesToRemove.push(line);
                }
                let linesSet = pagesData.get(r.startPage);
                if (linesSet) {
                    linesToRemove.forEach(l => linesSet.delete(l));
                }
            } else {
                // Redaction spans multiple pages
                // Remove lines from startPage.startLine to end of startPage (25)
                for (let line = r.startLine; line <= 25; line++) {
                    let linesSet = pagesData.get(r.startPage);
                    if (linesSet) linesSet.delete(line);
                }
                // Remove full pages in between if any
                for (let p = r.startPage + 1; p < r.endPage; p++) {
                    pagesData.set(p, new Set()); // entire page wiped out
                }
                // Remove lines from endPage from line 1 to endPage.endLine
                for (let line = 1; line <= r.endLine; line++) {
                    let linesSet = pagesData.get(r.endPage);
                    if (linesSet) linesSet.delete(line);
                }
            }
        });
    
        // 4) Convert the remaining lines per page into intervals
        const pageIntervals = [];
        for (let p = 1; p <= maxPage; p++) {
            const linesSet = pagesData.get(p);
            if (!linesSet || linesSet.size === 0) continue; // no lines remain on this page
            const lines = Array.from(linesSet).sort((a,b)=>a-b);
    
            // Group contiguous lines
            let start = lines[0];
            let prev = lines[0];
            for (let i = 1; i < lines.length; i++) {
                if (lines[i] !== prev + 1) {
                    // break in sequence
                    pageIntervals.push({startPage:p, startLine:start, endPage:p, endLine:prev});
                    start = lines[i];
                }
                prev = lines[i];
            }
            // push the last interval for this page
            pageIntervals.push({startPage:p, startLine:start, endPage:p, endLine:prev});
        }
    
        // 5) Merge intervals across page boundaries where possible
        // Sort intervals in reading order
        pageIntervals.sort((a,b)=>{
            if(a.startPage!==b.startPage) return a.startPage-b.startPage;
            return a.startLine - b.startLine;
        });
    
        // Attempt to merge contiguous intervals
        const merged = [];
        for (let i=0; i<pageIntervals.length; i++) {
            if (merged.length === 0) {
                merged.push(pageIntervals[i]);
            } else {
                const last = merged[merged.length-1];
                const current = pageIntervals[i];
                if (areContiguous(last, current)) {
                    // merge them
                    merged[merged.length-1] = mergeIntervals(last, current);
                } else {
                    merged.push(current);
                }
            }
        }
    
        // Return final intervals
        return merged;
    }
    
    // Below is the Svelte component logic for the UI
    let redactionsInput = `1.5 - 1.10
    2.1 - 2.25`; 
    // Default example, you can change this input. Each line represents a redaction interval.
    
    let outputIntervals = [];
    
    // Handler to compute the designations
    function handleCompute() {
        const lines = redactionsInput.trim().split('\n');
        const redactions = [];
        for (const line of lines) {
            const parsed = parseRange(line);
            if (parsed) {
                redactions.push(parsed);
            }
        }
    
        outputIntervals = computeDesignations(redactions);
    }
    </script>
    
    <style>
    /* Simple styling */
    .container {
        padding: 1rem;
        font-family: sans-serif;
    }
    
    textarea {
        width: 100%;
        height: 100px;
        margin-bottom: 1rem;
        font-family: monospace;
    }
    
    button {
        margin-bottom: 1rem;
        padding: 0.5rem;
        cursor: pointer;
    }
    
    pre {
        background: #f4f4f4;
        padding: 1rem;
        white-space: pre-wrap;
        word-wrap: break-word;
    }
    </style>
    
    <div class="container">
        <h1>Designation Calculator</h1>
        <p>Enter redactions (each on its own line) in the format: "Page.StartLine - Page.EndLine".</p>
        <textarea bind:value={redactionsInput}></textarea>
        <button on:click={handleCompute}>Compute Designations</button>
        <h2>Output Intervals:</h2>
        {#if outputIntervals.length > 0}
            <pre>
    {outputIntervals.map(i => `${i.startPage}.${i.startLine} - ${i.endPage}.${i.endLine}`).join('\n')}
            </pre>
        {:else}
            <p>No intervals (either no redactions input or all lines removed).</p>
        {/if}
    </div>
    