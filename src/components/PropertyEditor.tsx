import { useRecoilState } from "recoil";
import { boardState } from "../recoil/atoms/board";
import { selectedElementIdState } from "../recoil/atoms/ui";

function PropertyEditor () {
    const [boardState, setBoardState] = useRecoidState(boardState)
    const [selectedElementIdState, setSelectedElementIdState] = useRecoilState(selectedElementIdState)


    return (
        <div>
            hoge
        </div>
    )
}