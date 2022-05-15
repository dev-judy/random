import { useCallback, useState } from "react";
import "./App.css";
import ReactPageScroller from "react-page-scroller";
import FlipNumbers from "react-flip-numbers";

const App = () => {
    const [pageNum, setPageNum] = useState({ currentPage: null });

    const [range, setRange] = useState(50);
    const [state, setState] = useState(false);

    const [randomNum, setRandomNum] = useState(0);
    const [play, setPlay] = useState(false);

    const handleInit = useCallback(() => {
        setState(false);
        setRange(0);
    }, []);

    const handleInputValue = useCallback(
        (e) => {
            if (state) return alert("이미 범위가 셋팅되었습니다. 값을 바꾸려면 초기화 버튼을 눌러주세요");
            setRange(e.target.value);
        },
        [state],
    );

    const handlePageChange = useCallback((number) => {
        setPageNum({ currentPage: number });
    }, []);

    const handleBeforePageChange = (number) => {};

    const pickRandomNumber = () => {
        const max = Math.floor(range);
        const num = Math.floor(Math.random() * (max - 1)) + 1;
        setRandomNum(num);
        setPlay(true);
    };

    return (
        <div className="App">
            <ReactPageScroller
                pageOnChange={handlePageChange}
                customPageNumber={pageNum.currentPage}
                onBeforePageScroll={handleBeforePageChange}>
                <section className="component" style={{ backgroundColor: "black" }}>
                    <div>
                        <h1>Hands UP! 경품 추첨</h1>
                        <h2>랜덤 최대 범위 입력하기(기본적으로 1에서 부터 입력한 값까지 범위가 설정됩니다)</h2>

                        <div className="inputWrapper">
                            <input type="number" value={range} onChange={handleInputValue} />
                            <button onClick={() => setState(true)}>설정</button>
                            <button onClick={handleInit}>초기화</button>
                        </div>
                    </div>
                </section>
                <section className="component" style={{ backgroundColor: "black" }}>
                    <div>
                        <h1>Hands UP!</h1>
                        <button onClick={pickRandomNumber}>추첨하기</button>
                        <div className="numberWrapper">
                            <FlipNumbers
                                height={50}
                                width={50}
                                color="#fff"
                                background="black"
                                play={play}
                                perspective={100}
                                numbers={randomNum.toString()}
                                duration={6}
                                numberStyle={{
                                    fontSize: "32px !important",
                                }}
                            />
                        </div>
                    </div>
                </section>
            </ReactPageScroller>
        </div>
    );
};

export default App;
