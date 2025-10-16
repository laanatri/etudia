import pytest
from pydantic import ValidationError, HttpUrl
from app.models.capsules_request_models import CapsulesGenerateRequest

# pour lancer tout les tests
# $ pytest 

# # pour lancer un fichier de test
# $ pytest tests/test_extractJson.py

class TestCapsulesGenerateRequest:

    def test_valid_request_all_capsules(self):

        request = {
            "course_url": "https://yydyzkwmmyhlvhlrhsbx.supabase.co/storage/v1/object/public/courses/Passage%20du%20MCD%20au%20MLD.txt",
            "capsules": {
                "bloc": {
                    "create": True,
                    "number": 10
                },
                "summary": {
                    "create": True
                },
                "quiz": {
                    "create": True,
                    "number": 10
                }
            }
        }
        capsules_request = CapsulesGenerateRequest(**request)
        url = HttpUrl("https://yydyzkwmmyhlvhlrhsbx.supabase.co/storage/v1/object/public/courses/Passage%20du%20MCD%20au%20MLD.txt")
        assert capsules_request.course_url == url
        assert capsules_request.capsules.bloc.create is True
        assert capsules_request.capsules.bloc.number is 10
        assert capsules_request.capsules.summary.create is True
        assert capsules_request.capsules.quiz.create is True
        assert capsules_request.capsules.quiz.number is 10



    def test_valid_request_flashcards(self):

        request = {
            "course_url": "https://yydyzkwmmyhlvhlrhsbx.supabase.co/storage/v1/object/public/courses/Passage%20du%20MCD%20au%20MLD.txt",
            "capsules": {
                "bloc": {
                    "create": True,
                    "number": 10
                },
                "summary": {
                    "create": False
                },
                "quiz": {
                    "create": False,
                    "number": 0
                }
            }
        }
        capsules_request = CapsulesGenerateRequest(**request)
        assert capsules_request.capsules.bloc.create is True
        assert capsules_request.capsules.bloc.number is 10
        assert capsules_request.capsules.summary.create is False
        assert capsules_request.capsules.quiz.create is False
        assert capsules_request.capsules.quiz.number is 0



    def test_invalid_url(self):

        request = {
            "course_url": "httpsssss://yydyzkwmmyhlvhlrhsbx.supabase.co/storage/v1/object/public/courses/Passage%20du%20MCD%20au%20MLD.txt",
            "capsules": {
                "bloc": {
                    "create": True,
                    "number": 10
                },
                "summary": {
                    "create": True
                },
                "quiz": {
                    "create": True,
                    "number": 10
                }
            }
        }
        with pytest.raises(ValidationError):
            CapsulesGenerateRequest(**request)



    def test_bloc_number_to_high(self):

        request = {
            "course_url": "https://yydyzkwmmyhlvhlrhsbx.supabase.co/storage/v1/object/public/courses/Passage%20du%20MCD%20au%20MLD.txt",
            "capsules": {
                "bloc": {
                    "create": True,
                    "number": 100
                },
                "summary": {
                    "create": True
                },
                "quiz": {
                    "create": True,
                    "number": 10
                }
            }
        }
        with pytest.raises(ValidationError):
            CapsulesGenerateRequest(**request)



    def test_bloc_number_zero(self):

        request = {
            "course_url": "https://yydyzkwmmyhlvhlrhsbx.supabase.co/storage/v1/object/public/courses/Passage%20du%20MCD%20au%20MLD.txt",
            "capsules": {
                "bloc": {
                    "create": True,
                    "number": 0
                },
                "summary": {
                    "create": True
                },
                "quiz": {
                    "create": True,
                    "number": 10
                }
            }
        }
        with pytest.raises(ValidationError):
            CapsulesGenerateRequest(**request)



    def test_bloc_zero_capsules(self):

        request = {
            "course_url": "https://yydyzkwmmyhlvhlrhsbx.supabase.co/storage/v1/object/public/courses/Passage%20du%20MCD%20au%20MLD.txt",
            "capsules": {
                "bloc": {
                    "create": False,
                    "number": 0
                },
                "summary": {
                    "create": False
                },
                "quiz": {
                    "create": False,
                    "number": 0
                }
            }
        }
        with pytest.raises(ValidationError):
            CapsulesGenerateRequest(**request)