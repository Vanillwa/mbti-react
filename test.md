## 리스트 UI
1. 설정 안에 정렬 목록 수 등 표시
2. 리스트 형식 카드 형식 선택 가능하게

## 썸네일
- const showImg = item.content.match(
          /<img\s+[^>]*?src\s*=\s*['"]([^'"]*?)['"][^>]*?>/
        );
        const imgSrc = showImg ? showImg[1] : null;
