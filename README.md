![image.png](attachment:cdbb76d8-f80b-4b3b-bc58-dca7339d2f9a:image.png)

### [프로젝트 소개]

- **목적**: 외국인들이 병원에 방문할 때, 사용 가능한 언어 정보를 제공하여 더 나은 의료 서비스를 받을 수 있도록 돕는 웹사이트 개발
- **주요 기능**:
    - **병원 리스트 페이지**: 서울시 강남구와 강동구의 병원 정보를 제공하며, 병원별 사용 언어, 병원명, 주소, 진료과목을 확인할 수 있음
    - **상세 페이지**: 병원의 세부 정보를 제공하며, 병원별 사용 언어, 병원명, 주소, 진료과목을 상세히 보여줌
    - **진료 예약 기능**: 외국인 사용자가 진료 예약을 할 수 있는 기능 제공
    - **병원명 검색 기능**: 병원 이름을 검색하여 원하는 병원을 쉽게 찾을 수 있음
    - **필터링 기능** (추가 예정): '언어', '거리 순', '진료과목', '지역', '영업 중 여부'에 따른 병원 검색 필터링 기능 제공
    - **회원 관련 기능** (추가 예정): 리뷰, 즐겨찾기, 마이페이지 기능 추가 예정
    - **영어 버전 웹사이트** (추가 예정): 외국인을 위한 영어 버전 웹사이트 제공 예정

### [SQL 관련 화면과 코드]

- **기능**: 강동구와 강남구의 병원 정보를 30개씩 조회, ‘병원 더보기’ 버튼 클릭하면, offset 15씩 증가시킴

![image.png](attachment:ec993bce-7e7f-44a4-a8d3-d564f4fc6904:image.png)

```java
String sql = 
						"(SELECT gangdong_name AS hospital_name, "
						+ "gangdong_languages AS hospital_languages, "
						+ "gangdong_main_address AS hospital_main_address, "
						+ "SUBSTRING_INDEX(gangdong_category, ',', 1) AS hospital_main_category, "
						+ "'gangdong' AS source, "
						+ "id AS hospital_id "
						+ "FROM gangdong_hospital "
						+ "ORDER BY hospital_id ASC "
						+ "LIMIT 15 OFFSET :OFFSET) "
						+ "UNION "
						+ "(SELECT gangnam_name AS hospital_name, "
						+ "gangnam_languages AS hospital_languages, "
						+ "gangnam_main_address AS hospital_main_address, "
						+ "SUBSTRING_INDEX(gangnam_category, ',', 1) AS hospital_main_category, "
						+ "'gangnam' AS source, "
						+ "id AS hospital_id "
						+ "FROM gangnam_hospital "
						+ "ORDER BY hospital_id ASC "
						+ "LIMIT 15 OFFSET :OFFSET);"
				;
			Query query = em.createNativeQuery(sql, Tuple.class);
			query.setParameter("OFFSET", offsetNum);
		
			List<Tuple> rs = query.getResultList();
			
			List<Map<String, Object>> rsToMap = JPAUtil.convertTupleToMap(rs);
			return rsToMap;
```

- **기능**: 병원 상세 페이지 (병원명, 주소, 가능 언어, 진료과목 등 )

![image.png](attachment:81a9a7d8-2756-4c12-b276-a63feb6c749b:image.png)

![image.png](attachment:dab58c87-b27b-44e9-a576-071abaffdfc0:image.png)

![image.png](attachment:653e553d-86cb-4dbc-a154-3f3cff725e46:image.png)

 source를 기준으로 gangnam_hospital 또는 gangdong_hospital에서 SELECT

```java

	String sql = "SELECT gangnam_name AS hospital_name, "
					+ "gangnam_phone_number AS hospital_phone_number, "
					+ "gangnam_languages AS hospital_languages, "
					+ "gangnam_main_address AS hospital_main_address, "
					+ "gangnam_address AS hospital_address, "
					+ "gangnam_category AS hospital_category "
					+ "FROM gangnam_hospital WHERE ID = :ID";;
			Query query = em.createNativeQuery(sql, Tuple.class);
			query.setParameter("ID", hospitalId);
		
			List<Tuple> rs = query.getResultList();
			
			List<Map<String, Object>> rsToMap = JPAUtil.convertTupleToMap(rs);
			return rsToMap;
```

```java
String sql = "SELECT gangdong_name AS hospital_name, "
					+ "gangdong_phone_number AS hospital_phone_number, "
					+ "gangdong_languages AS hospital_languages, "
					+ "gangdong_main_address AS hospital_main_address, "
					+ "gangdong_address AS hospital_address, "
					+ "gangdong_category AS hospital_category "
					+ "FROM gangdong_hospital WHERE ID = :ID";
			
			
			Query query = em.createNativeQuery(sql, Tuple.class);
			query.setParameter("ID", hospitalId);
		
			List<Tuple> rs = query.getResultList();
			
			List<Map<String, Object>> rsToMap = JPAUtil.convertTupleToMap(rs);
			return rsToMap;
```

- **기능**: 병원 진료 예약 페이지(진료 날짜와 시간, 희망 언어, 증상/과목 등)

![image.png](attachment:6a4f3389-821d-40d8-a3fd-adcc07359dd4:image.png)

![image.png](attachment:78704620-e259-48cc-a67d-79ddc5a5c520:image.png)

![image.png](attachment:5206f1de-78d7-45af-9427-b0f1d4c2dec4:image.png)

![image.png](attachment:b84f5c12-5076-4a8e-ac8e-f762ebba3b58:image.png)

- **기능**: 병원명 검색

![image.png](attachment:07969894-14ff-4c24-b830-86e512b864b3:image.png)

```java
String sql = "(SELECT gangdong_name AS hospital_name, "
						+ "gangdong_languages AS hospital_languages, "
						+ "gangdong_main_address AS hospital_main_address, "
						+ "SUBSTRING_INDEX(gangdong_category, ',', 1) AS hospital_main_category, "
						+ "'gangdong' AS source, "
						+ "id AS hospital_id "
						+"FROM gangdong_hospital "
						+"WHERE gangdong_name LIKE CONCAT('%', :hospital_name, '%') "
						+ "ORDER BY id ASC "
						+ "LIMIT 15 OFFSET :OFFSET) "
						+ "UNION "
						+"(SELECT gangnam_name AS hospital_name, "
						+ "gangnam_languages AS hospital_languages, "
						+ "gangnam_main_address AS hospital_main_address, "
						+ "SUBSTRING_INDEX(gangnam_category, ',', 1) AS hospital_main_category, "
						+ "'gangnam' AS source, "
						+ "id AS hospital_id "
						+"FROM gangnam_hospital "
						+"WHERE gangnam_name LIKE CONCAT('%', :hospital_name, '%') "
						+ "ORDER BY id ASC "
						+ "LIMIT 15 OFFSET :OFFSET) "
						;
						
			Query query = em.createNativeQuery(sql, Tuple.class);
			query.setParameter("hospital_name", hospitalName);
			query.setParameter("OFFSET", offsetNum);
		
			List<Tuple> rs = query.getResultList();
			
			List<Map<String, Object>> rsToMap = JPAUtil.convertTupleToMap(rs);
			return rsToMap;
```

### [사용 기술]

- **백엔드**: Java(Spring Boot), MySQL
- **프론트엔드**: React, TypeScript, Ant Design Components

### [역할]

- **전체 프로젝트 설계 및 개발**: 백엔드, 프론트엔드, 디자인 및 기획을 포함한 전반적인 프로젝트 개발
- **백엔드 개발**: 데이터베이스 설계, Spring Boot 기반 서버 구축
- **프론트엔드 개발**: 사용자 인터페이스(UI) 구현, 병원 정보와 검색 기능 등 구현
- **기획 및 디자인**: 직관적이고 사용하기 쉬운 UI/UX 설계, 공공데이터 CSV 파일을 받아 필요한 데이터를 테이블에 삽입하여 시스템 설계

### [기술적 도전]

- **영어 버전 웹사이트 개발**: 외국인을 위해 웹사이트의 영어 버전 추가 예정
    - 영어 버전에서는 사용자가 영어로 검색할 수 있기 때문에, 데이터베이스 정보도 영어로 바꾸거나 다국어로 처리하는 부분이 도전 과제가 될 예정

### [성과]

- **웹사이트 개발 중**: 병원 정보, 예약 시스템 및 다국어 지원 기능을 갖춘 웹사이트를 개발 중
- **공공데이터 활용**: CSV 데이터를 기반으로 병원 정보 테이블을 설계 및 구현
- **UI/UX 설계**: 사용자가 직관적으로 병원 정보를 찾고 예약할 수 있는 웹사이트의 기본 구조 완성
